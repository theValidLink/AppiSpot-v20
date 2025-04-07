import React from 'react';
import { Upload, X, Star, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../lib/storage';
import toast from 'react-hot-toast';

interface ImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], onChange, maxImages = 10 }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check if adding new images would exceed the limit
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    const loadingToast = toast.loading(`Processing ${files.length} image${files.length > 1 ? 's' : ''}...`);

    try {
      const uploadPromises = files.map(file => uploadImage(file, 'gallery'));
      const newImages = await Promise.all(uploadPromises);
      
      // If this is the first image, make it the featured image
      if (images.length === 0) {
        onChange([newImages[0], ...newImages.slice(1)]);
      } else {
        onChange([...images, ...newImages]);
      }
      
      toast.dismiss(loadingToast);
      toast.success('Images uploaded successfully');
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message);
    }
  };

  const handleMakeFeatured = (index: number) => {
    if (index === 0) return; // Already featured
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    onChange(newImages);
    toast.success('Featured image updated');
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success('Image removed');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`relative aspect-square rounded-lg overflow-hidden group bg-gray-100 ${
              index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index < 4 ? 'eager' : 'lazy'}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleMakeFeatured(index)}
                    className="p-2 bg-white text-[#40d9ed] rounded-full hover:bg-[#40d9ed] hover:text-white transition-colors"
                    title="Make featured image"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {index === 0 ? (
              <div className="absolute top-2 left-2 px-2 py-1 bg-[#40d9ed] text-white text-xs font-medium rounded-lg">
                Featured
              </div>
            ) : (
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                {index + 1}
              </div>
            )}
          </div>
        ))}
        
        {images.length < maxImages && (
          <div className={`relative aspect-square ${images.length === 0 ? 'col-span-2 row-span-2' : ''}`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              id="gallery-upload"
              multiple
              aria-label="Upload images"
            />
            <label
              htmlFor="gallery-upload"
              className="flex flex-col justify-center items-center h-full px-4 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-[#40d9ed] transition-all duration-300 group bg-white hover:bg-gray-50"
            >
              <div className="flex flex-col items-center text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#40d9ed] transition-colors duration-300" />
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-900">Click to upload</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {images.length === 0 
                      ? 'Upload your first image as featured image'
                      : `${maxImages - images.length} spots remaining`}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;