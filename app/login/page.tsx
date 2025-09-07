'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.username.trim() || !formData.password.trim()) {
        setError('Please fill in all fields');
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Use auth context to store user data
        login(data.user, data.token);
        
        // Redirect to classify page
        window.location.href = '/classify';
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
      
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-500">
      {/* Animated Background Elements */}
      <BackgroundParticles />
      <FloatingOrbs />
      <EnergyWaves />
      <FloatingClouds />
      <FlyingBirds />
      <Butterflies />
      <SunRays />
      <FloatingFlowers />
      <FloatingLeaves />
      <RainDrops />
      <Fireflies />
      <FloatingBubbles />
      <EnhancedClouds />
      <FloatingFeathers />
      <FloatingSeeds />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-emerald-200 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Welcome
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-white/90 via-cyan-100/85 to-emerald-100/90 backdrop-blur-xl border-teal-300/70 shadow-2xl shadow-teal-400/30">
              <CardHeader className="text-center pb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <LogIn className="w-8 h-8 text-white" />
                </motion.div>
                <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-teal-600 text-lg">
                  Sign in to your account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-teal-700">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-teal-300 rounded-xl bg-white/80 text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-teal-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-teal-300 rounded-xl bg-white/80 text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <motion.div
                  variants={itemVariants}
                  className="text-center mt-6 pt-6 border-t border-teal-200"
                >
                  <p className="text-teal-600 mb-3">Don't have an account?</p>
                  <Link href="/signup">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-teal-300 text-teal-700 hover:bg-teal-50 font-semibold rounded-xl transition-all duration-300"
                    >
                      Create Account
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
