'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Camera, Upload, ArrowLeft, Sparkles, Target } from 'lucide-react';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';
import { ProtectedRoute } from '@/components/protected-route';
import Link from 'next/link';

export default function ClassifyPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <ProtectedRoute>
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
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl font-bold text-emerald-800 mb-4"
            variants={itemVariants}
          >
            Choose Classification Method
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Select how you'd like to analyze your livestock
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image Upload Option */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
          >
            <Link href="/classify/upload">
              <Card className="h-full bg-gradient-to-br from-white/90 via-cyan-100/85 to-emerald-100/90 backdrop-blur-xl border-teal-300/70 shadow-2xl shadow-teal-400/30 aurora cursor-pointer transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Upload className="w-12 h-12 text-white" />
                  </motion.div>
                  <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
                    Image Upload
                  </CardTitle>
                  <CardDescription className="text-teal-600 text-lg">
                    Upload photos for comprehensive analysis
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-teal-700">
                      <span className="px-3 py-1 bg-teal-200/60 rounded-full">Full Analysis</span>
                      <span className="px-3 py-1 bg-teal-200/60 rounded-full">Breed Detection</span>
                      <span className="px-3 py-1 bg-teal-200/60 rounded-full">Quality Scoring</span>
                      <span className="px-3 py-1 bg-teal-200/60 rounded-full">Measurements</span>
                    </div>
                    
                    <p className="text-teal-700 text-sm leading-relaxed">
                      Get detailed analysis including breed identification, quality scores, 
                      body measurements, and comprehensive livestock assessment.
                    </p>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Live Camera Option */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
          >
            <Link href="/classify/live">
              <Card className="h-full bg-gradient-to-br from-white/90 via-cyan-100/85 to-emerald-100/90 backdrop-blur-xl border-teal-300/70 shadow-2xl shadow-teal-400/30 aurora cursor-pointer transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Camera className="w-12 h-12 text-white" />
                  </motion.div>
                  <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
                    Live Camera Feed
                  </CardTitle>
                  <CardDescription className="text-teal-600 text-lg">
                    Real-time classification with camera
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-teal-700">
                      <span className="px-3 py-1 bg-cyan-200/60 rounded-full">Real-time</span>
                      <span className="px-3 py-1 bg-cyan-200/60 rounded-full">Cattle/Buffalo</span>
                      <span className="px-3 py-1 bg-cyan-200/60 rounded-full">Human Detection</span>
                      <span className="px-3 py-1 bg-cyan-200/60 rounded-full">Instant Results</span>
                    </div>
                    
                    <p className="text-teal-700 text-sm leading-relaxed">
                      Get instant classification between cattle and buffaloes. 
                      Also detects humans for safety. Perfect for live monitoring.
                    </p>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                      <Camera className="w-5 h-5 mr-2" />
                      Start Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-200" />
              <h3 className="text-xl font-semibold text-white">AI-Powered Analysis</h3>
              <Sparkles className="w-6 h-6 text-emerald-200" />
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-2xl mx-auto">
              Our advanced AI system provides accurate livestock classification with high confidence levels. 
              Choose the method that best fits your needs and get instant, reliable results.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Empty container for scrolling space */}
      <div className="h-32"></div>
      </div>
    </ProtectedRoute>
  );
}
