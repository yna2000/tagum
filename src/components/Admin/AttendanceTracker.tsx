
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { QrCode, Search, UserCheck, UserX, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface EventAttendance {
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  joinedAt: string;
  isPresent: boolean;
  checkedInAt?: string;
}

export const AttendanceTracker = () => {
  const [attendanceData, setAttendanceData] = useState<EventAttendance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = () => {
    // Mock attendance data - in real app, this would come from API
    const mockAttendance: EventAttendance[] = [
      {
        eventId: '1',
        eventTitle: 'STI Tech Summit 2024',
        userId: '2',
        userName: 'John Doe',
        userEmail: 'john@sti.edu',
        joinedAt: '2024-12-10T10:00:00Z',
        isPresent: true,
        checkedInAt: '2024-12-15T09:30:00Z'
      },
      {
        eventId: '2',
        eventTitle: 'Career Fair 2024',
        userId: '2',
        userName: 'John Doe',
        userEmail: 'john@sti.edu',
        joinedAt: '2024-12-12T14:00:00Z',
        isPresent: false
      }
    ];
    
    // Load from localStorage and merge with mock data
    const stored = JSON.parse(localStorage.getItem('event_attendance') || '[]');
    const combined = [...mockAttendance, ...stored];
    setAttendanceData(combined);
  };

  const markAttendance = (userId: string, eventId: string, isPresent: boolean) => {
    const updatedData = attendanceData.map(record => {
      if (record.userId === userId && record.eventId === eventId) {
        return {
          ...record,
          isPresent,
          checkedInAt: isPresent ? new Date().toISOString() : undefined
        };
      }
      return record;
    });
    
    setAttendanceData(updatedData);
    localStorage.setItem('event_attendance', JSON.stringify(updatedData));
    
    const student = attendanceData.find(r => r.userId === userId && r.eventId === eventId);
    toast.success(
      `${student?.userName} marked as ${isPresent ? 'present' : 'absent'}`
    );
  };

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = selectedEvent === 'all' || record.eventId === selectedEvent;
    return matchesSearch && matchesEvent;
  });

  const uniqueEvents = [...new Set(attendanceData.map(r => ({ id: r.eventId, title: r.eventTitle })))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Event Attendance Tracker
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <label htmlFor="event-select" className="sr-only">Select Event</label>
          <select
            id="event-select"
            title="Select Event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Events</option>
            {uniqueEvents.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <QrCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No attendance records found</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record, index) => (
                  <motion.tr
                    key={`${record.userId}-${record.eventId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {record.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{record.userName}</p>
                          <p className="text-sm text-gray-500">{record.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{record.eventTitle}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(record.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={record.isPresent ? "default" : "secondary"}
                        className={record.isPresent ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                      >
                        {record.isPresent ? 'Present' : 'Absent'}
                      </Badge>
                      {record.checkedInAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Checked in: {new Date(record.checkedInAt).toLocaleString()}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={record.isPresent ? "secondary" : "default"}
                          onClick={() => markAttendance(record.userId, record.eventId, true)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={!record.isPresent ? "secondary" : "default"}
                          onClick={() => markAttendance(record.userId, record.eventId, false)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
