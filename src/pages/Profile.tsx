
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, Clock, Eye, MousePointer, ArrowLeft, LogOut, Edit, User, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || ''
  });

  const handleBack = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleEditProfile = () => {
    // Mock update - in real app, this would call an API
    toast.success('Profile updated successfully');
    setIsEditModalOpen(false);
  };

  // Mock data - in real app, this would come from API
  const joinedEvents = [
    {
      id: '1',
      title: 'Tech Innovation Summit 2024',
      date: '2024-01-15',
      location: 'STI Main Campus',
      status: 'attended'
    },
    {
      id: '2',
      title: 'Career Fair Spring 2024',
      date: '2024-02-20',
      location: 'STI Auditorium',
      status: 'registered'
    }
  ];

  const adInteractions = [
    {
      id: '1',
      adTitle: 'Student Laptop Deals',
      viewedAt: '2024-01-10',
      clicked: true
    },
    {
      id: '2',
      adTitle: 'Coffee Shop Discount',
      viewedAt: '2024-01-12',
      clicked: false
    }
  ];

  const activityLogs = [
    {
      id: '1',
      action: 'Joined event',
      details: 'Tech Innovation Summit 2024',
      timestamp: '2024-01-10 14:30'
    },
    {
      id: '2',
      action: 'Viewed ad',
      details: 'Student Laptop Deals',
      timestamp: '2024-01-10 14:25'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex gap-2">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Edit Profile
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  </div>
                  {user?.role === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="edit-student-id">Student ID</Label>
                      <Input
                        id="edit-student-id"
                        value={editForm.studentId}
                        onChange={(e) => setEditForm({...editForm, studentId: e.target.value})}
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditProfile}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="h-20 w-20 ring-2 ring-blue-200">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1">
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {user?.name}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600"
                  >
                    {user?.email}
                  </motion.p>
                  {user?.studentId && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                        <User className="h-3 w-3 mr-1" />
                        Student ID: {user.studentId}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="ads" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ad History
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="events" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      Joined Events
                    </CardTitle>
                    <CardDescription>Events you've registered for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {joinedEvents.map((event, index) => (
                        <motion.div 
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.date}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={event.status === 'attended' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="ads" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-green-500" />
                      Ad Interactions
                    </CardTitle>
                    <CardDescription>Ads you've viewed and clicked</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adInteractions.map((ad, index) => (
                        <motion.div 
                          key={ad.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <Eye className="h-5 w-5 text-green-500" />
                            <div>
                              <h3 className="font-medium">{ad.adTitle}</h3>
                              <p className="text-sm text-gray-600">Viewed on {ad.viewedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {ad.clicked && (
                              <Badge variant="default" className="flex items-center">
                                <MousePointer className="h-3 w-3 mr-1" />
                                Clicked
                              </Badge>
                            )}
                            <Badge variant="secondary">Viewed</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      Activity Log
                    </CardTitle>
                    <CardDescription>Your recent platform activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLogs.map((log, index) => (
                        <motion.div 
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <motion.div 
                            className="h-2 w-2 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="flex-1">
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-gray-600">{log.details}</p>
                            <p className="text-xs text-gray-500">{log.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
