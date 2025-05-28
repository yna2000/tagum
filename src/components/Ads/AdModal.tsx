
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, X, Clock, Gift, Star, Zap } from 'lucide-react';
import { trackAdClick } from '@/services/api';

interface AdModalProps {
  ad: {
    id: string;
    title: string;
    description: string;
    image: string;
    clickUrl: string;
  };
  onClose: () => void;
  onInteraction: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({ ad, onClose, onInteraction }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;
        const newProgress = ((5 - newCount) / 5) * 100;
        setProgress(newProgress);
        
        if (newCount <= 0) {
          clearInterval(timer);
          setHasInteracted(true);
          return 0;
        }
        return newCount;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAdClick = async () => {
    await trackAdClick(ad.id);
    window.open(ad.clickUrl, '_blank');
    setHasInteracted(true);
  };

  const handleContinue = () => {
    onInteraction();
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: -30,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          {/* Header with close button */}
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Gift className="w-6 h-6 text-blue-500" />
                </motion.div>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Special Offer
                </DialogTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="px-6 pb-6 space-y-6">
            {/* Enhanced image section */}
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover="hover"
              variants={imageVariants}
            >
              <img 
                src={ad.image} 
                alt={ad.title}
                className="w-full h-56 object-cover cursor-pointer"
                onClick={handleAdClick}
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-white rounded-full p-3 shadow-lg"
                    >
                      <ExternalLink className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
            
            {/* Content section */}
            <div className="text-center space-y-4">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-800"
              >
                {ad.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 leading-relaxed"
              >
                {ad.description}
              </motion.p>
              
              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    onClick={handleAdClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Get This Deal Now!
                  </Button>
                </motion.div>
                
                {hasInteracted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button 
                      onClick={handleContinue} 
                      variant="outline"
                      className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 rounded-xl"
                    >
                      Continue to Event
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Please wait {countdown}s or interact with the ad to continue</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2 bg-gray-200"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-4 right-16 w-3 h-3 bg-blue-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-8 left-8 w-2 h-2 bg-purple-400 rounded-full opacity-40"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
