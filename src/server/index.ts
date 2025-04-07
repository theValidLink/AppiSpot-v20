import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import spotsRouter from './routes/spots';
import bookingsRouter from './routes/bookings';
import usersRouter from './routes/users';
import chatRouter from './routes/chat';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/spots', spotsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/users', usersRouter);
app.use('/api/chat', chatRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a chat room
  socket.on('join_chat', (chatId: string) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Send message
  socket.on('send_message', async (data: {
    chatId: string;
    senderId: string;
    receiverId: string;
    content: string;
  }) => {
    try {
      // Create new message
      const message = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content
      });

      // Update chat
      await Chat.findByIdAndUpdate(data.chatId, {
        lastMessage: message._id,
        $inc: { unreadCount: 1 },
        updatedAt: new Date()
      });

      // Broadcast message to room
      io.to(data.chatId).emit('receive_message', {
        ...message.toObject(),
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Mark messages as read
  socket.on('mark_read', async (data: { chatId: string; userId: string }) => {
    try {
      await Message.updateMany(
        { chatId: data.chatId, receiverId: data.userId, read: false },
        { read: true }
      );

      await Chat.findByIdAndUpdate(data.chatId, { unreadCount: 0 });
      
      io.to(data.chatId).emit('messages_read', { chatId: data.chatId });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});