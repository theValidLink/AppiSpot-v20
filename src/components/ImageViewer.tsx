import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  onClose: () => void;
  initialIndex?: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Ensure initialIndex is within bounds
  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < images.length) {
      setCurrentIndex(initialIndex);
    } else {
      setCurrentIndex(0);
    }
  }, [initialIndex, images.length]);

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handlePrevious, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black bg-opacity-90 touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[10000]">
        <button
          onClick={handleCloseClick}
          className="p-2 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close image viewer"
        >
          <X className="h-7 w-7" />
        </button>
        
        <div className="flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1.5 rounded-full">
          <Grid className="h-4 w-4 text-white" />
          <span className="text-white text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] p-2 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] p-2 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="relative h-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-white"></div>
          </div>
        )}
        {images.length > 0 && images[currentIndex] && (
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className={`max-h-[85vh] max-w-[90vw] object-contain select-none transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';
              setIsLoading(false);
            }}
            draggable={false}
          />
        )}
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex space-x-2 overflow-x-auto px-4 py-2 max-w-full bg-black bg-opacity-50 rounded-lg">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                  idx === currentIndex ? 'border-white opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-80'
                }`}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(idx);
                }}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;