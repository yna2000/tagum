
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, CheckCircle } from 'lucide-react';

interface QRCodeModalProps {
  qrData: {
    id: string;
    eventId: string;
    qrCode: string;
    joinedAt: string;
  };
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ qrData, onClose }) => {
  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `event-${qrData.eventId}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Event QR Code',
          text: 'Here\'s my QR code for the STI event!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Event Joined Successfully!
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
            <QRCodeSVG
              id="qr-code"
              value={qrData.qrCode}
              size={200}
              level="H"
              includeMargin={true}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Show this QR code at the event entrance for check-in
            </p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(qrData.joinedAt).toLocaleString()}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
