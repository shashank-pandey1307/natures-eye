'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Camera, Upload, Sparkles } from 'lucide-react';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function WelcomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

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

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)"
    },
    tap: { scale: 0.95 }
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

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Logo */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl sm:rounded-3xl mb-6 sm:mb-12 shadow-2xl shadow-teal-500/40 sparkle breathe"
            whileHover={{ scale: 1.08, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Leaf className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-800 mb-4 sm:mb-6 gentle-bounce px-4"
            variants={itemVariants}
          >
            {t('welcome.title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4"
            variants={itemVariants}
          >
            {t('welcome.description')}
          </motion.p>

          {/* Feature Icons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-16 px-4"
            variants={itemVariants}
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium">Live Camera</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium">Image Upload</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium">AI Analysis</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-center space-y-6 px-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/login">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Button className="w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-lg sm:text-xl rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 floating-dust">
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {t('login.title')}
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </Link>
          
          <motion.div
            variants={itemVariants}
            className="text-white/80"
          >
            <p className="mb-4">Don't have an account?</p>
            <Link href="/signup">
              <Button 
                variant="outline" 
                className="px-8 py-3 border-2 border-white/30 text-white bg-white/10 font-semibold rounded-2xl transition-all duration-300"
              >
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Empty container for scrolling space */}
      <div className="h-32"></div>
    </div>
  );
}
