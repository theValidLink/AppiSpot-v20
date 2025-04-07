import express from 'express';
import { Chat } from '../../models/Chat';
import { Message } from '../../models/Message';

const router = express.Router();

// Get user's chats
router.get('/chats', async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'fullName avatar')
      .populate('lastMessage')
      .sort('-updatedAt');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Get chat messages
router.get('/chats/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate('senderId', 'fullName avatar')
      .sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create new chat
router.post('/chats', async (req, res) => {
  try {
    const { participantId } = req.body;
    const userId = req.user.id;

    const existingChat = await Chat.findOne({
      participants: { $all: [userId, participantId] }
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    const chat = await Chat.create({
      participants: [userId, participantId]
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

export default router;