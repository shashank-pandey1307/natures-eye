'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Lock, Eye, EyeOff, UserPlus, CheckCircle, LogIn } from 'lucide-react';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.error || 'Sign up failed. Please try again.');
      }
      
    } catch (err) {
      setError('Sign up failed. Please try again.');
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-500">
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
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-white/90 via-cyan-100/85 to-emerald-100/90 backdrop-blur-xl border-teal-300/70 shadow-2xl shadow-teal-400/30">
              <CardContent className="text-center py-12">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-teal-800 mb-4">Account Created!</h2>
                <p className="text-teal-600 mb-6">Your account has been created successfully.</p>
                <p className="text-sm text-teal-500">Redirecting to login page...</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
                  <UserPlus className="w-8 h-8 text-white" />
                </motion.div>
                <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
                  Create Account
                </CardTitle>
                <CardDescription className="text-teal-600 text-lg">
                  Join Nature's Eye today
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-teal-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-teal-300 rounded-xl bg-white/80 text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

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
                        placeholder="Choose a username"
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
                        placeholder="Create a password"
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

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-teal-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-teal-300 rounded-xl bg-white/80 text-teal-800 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-700 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <motion.div
                  variants={itemVariants}
                  className="text-center mt-6 pt-6 border-t border-teal-200"
                >
                  <p className="text-teal-600 mb-3">Already have an account?</p>
                  <Link href="/login">
                    <Button 
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </div>
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
