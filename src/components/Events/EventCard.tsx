
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import { JoinEvent } from './JoinEvent';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    joined: number;
    image: string;
  };
  onJoin?: (eventId: string) => void;
  showJoinButton?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onJoin, 
  showJoinButton = true 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const availableSpots = event.capacity - event.joined;
  const isFullyBooked = availableSpots <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <Badge variant={isFullyBooked ? "destructive" : "secondary"}>
              {isFullyBooked ? 'Full' : `${availableSpots} spots left`}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {event.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {event.joined} / {event.capacity} joined
            </div>
          </div>
          
          {showJoinButton && (
            <JoinEvent 
              eventId={event.id} 
              isDisabled={isFullyBooked}
              onJoin={onJoin}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
