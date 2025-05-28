
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { toast } from 'sonner';

interface PendingUser {
  id: string;
  name: string;
  email: string;
  studentId: string;
  registrationDate: string;
}

export const StudentVerification = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = () => {
    const pending = JSON.parse(localStorage.getItem('pending_users') || '[]');
    setPendingUsers(pending);
  };

  const approveUser = (userId: string) => {
    const pending = JSON.parse(localStorage.getItem('pending_users') || '[]');
    const userToApprove = pending.find((u: PendingUser) => u.id === userId);
    
    if (userToApprove) {
      // Add to verified users
      const verifiedUsers = JSON.parse(localStorage.getItem('verified_users') || '[]');
      verifiedUsers.push({ ...userToApprove, isVerified: true });
      localStorage.setItem('verified_users', JSON.stringify(verifiedUsers));
      
      // Remove from pending
      const updatedPending = pending.filter((u: PendingUser) => u.id !== userId);
      localStorage.setItem('pending_users', JSON.stringify(updatedPending));
      
      setPendingUsers(updatedPending);
      toast.success(`${userToApprove.name} has been approved`);
    }
  };

  const rejectUser = (userId: string) => {
    const pending = JSON.parse(localStorage.getItem('pending_users') || '[]');
    const userToReject = pending.find((u: PendingUser) => u.id === userId);
    
    if (userToReject) {
      const updatedPending = pending.filter((u: PendingUser) => u.id !== userId);
      localStorage.setItem('pending_users', JSON.stringify(updatedPending));
      setPendingUsers(updatedPending);
      toast.error(`${userToReject.name}'s registration has been rejected`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          Pending Student Verifications
          {pendingUsers.length > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {pendingUsers.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending verifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {pendingUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">ID: {user.studentId}</p>
                      <p className="text-xs text-gray-400">
                        Registered: {new Date(user.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => approveUser(user.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => rejectUser(user.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
