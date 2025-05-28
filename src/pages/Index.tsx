
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Bell, QrCode } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            STI Event Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join exciting events, connect with peers, and enhance your college experience 
            with seamless QR code check-ins and real-time notifications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="px-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Event Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Browse and discover exciting events happening around campus
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <QrCode className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>QR Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get your unique QR code for seamless event check-in
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Bell className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <CardTitle>Live Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stay updated with real-time event reminders and updates
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with fellow students and track your event history
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join the STI Community?
          </h2>
          <p className="text-gray-600 mb-8">
            Create your account and start exploring amazing events today!
          </p>
          <Link to="/register">
            <Button size="lg" className="px-12">
              Join Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
