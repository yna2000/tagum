
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdModal } from '../Ads/AdModal';
import { QRCodeModal } from '../QR/QRCodeModal';
import { getApprovedAd, joinEvent, trackAdView } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { toast } from 'sonner';

interface JoinEventProps {
  eventId: string;
  isDisabled?: boolean;
  onJoin?: (eventId: string) => void;
}

export const JoinEvent: React.FC<JoinEventProps> = ({ 
  eventId, 
  isDisabled = false, 
  onJoin 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [qrData, setQrData] = useState(null);
  
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const handleJoinClick = async () => {
    if (!user) {
      toast.error('Please login to join events');
      return;
    }

    setIsLoading(true);
    
    try {
      // Check for approved ads
      const ad = await getApprovedAd();
      
      if (ad) {
        // Track ad view
        await trackAdView(ad.id);
        setCurrentAd(ad);
        setShowAdModal(true);
      } else {
        // No ad, proceed directly to join
        await proceedToJoin();
      }
    } catch (error) {
      toast.error('Failed to load ad content');
      setIsLoading(false);
    }
  };

  const proceedToJoin = async () => {
    try {
      const joinData = await joinEvent(eventId, user.id);
      setQrData(joinData);
      setShowQRModal(true);
      
      // Add success notification
      addNotification({
        title: 'Event Joined Successfully!',
        message: 'Your QR code is ready for check-in',
        type: 'success'
      });
      
      toast.success('Successfully joined event!');
      
      if (onJoin) {
        onJoin(eventId);
      }
    } catch (error) {
      toast.error('Failed to join event');
    } finally {
      setIsLoading(false);
      setShowAdModal(false);
    }
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    setIsLoading(false);
  };

  const handleAdInteraction = async () => {
    await proceedToJoin();
  };

  return (
    <>
      <Button 
        onClick={handleJoinClick}
        disabled={isDisabled || isLoading}
        className="w-full"
      >
        {isLoading ? 'Joining...' : isDisabled ? 'Event Full' : 'Join Event'}
      </Button>

      {showAdModal && currentAd && (
        <AdModal
          ad={currentAd}
          onClose={handleAdClose}
          onInteraction={handleAdInteraction}
        />
      )}

      {showQRModal && qrData && (
        <QRCodeModal
          qrData={qrData}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </>
  );
};
