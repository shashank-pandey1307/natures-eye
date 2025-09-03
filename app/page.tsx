'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, FileText, BarChart3, Sparkles, Zap, Target, TrendingUp, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [farmData, setFarmData] = useState({
    farmId: '',
    farmName: '',
    location: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFarmDataChange = (field: keyof typeof farmData, value: string) => {
    setFarmData({ ...farmData, [field]: value });
    if (message) {
      setMessage(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    if (farmData.farmId && !farmData.farmName) {
      setMessage('Please enter a farm name when providing a farm ID');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setMessage(null);
    
    if (selectedFile) {
      setSelectedFile(null);
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('farmId', farmData.farmId);
      formData.append('farmName', farmData.farmName);
      formData.append('location', farmData.location);

      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setMessage('Image analyzed successfully! Farm information saved.');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
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
        
        {/* Beautiful Nature Animations */}
        <FloatingClouds />
        <FlyingBirds />
        <Butterflies />
        <SunRays />
        <FloatingFlowers />
        
        {/* Enhanced Background Animations */}
        <FloatingLeaves />
        <RainDrops />
        <Fireflies />
        <FloatingBubbles />
        <EnhancedClouds />
        <FloatingFeathers />
        <FloatingSeeds />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Logo */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 rounded-3xl mb-8 shadow-2xl shadow-teal-500/40 sparkle breathe"
            whileHover={{ scale: 1.08, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Leaf className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl font-bold text-emerald-800 mb-4 gentle-bounce">
            Nature's Eye
          </h1>
          
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered livestock classification system for precise cattle and buffalo analysis
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
                                                                                       <Card className="bg-gradient-to-br from-white/90 via-cyan-100/85 to-emerald-100/90 backdrop-blur-xl border-teal-300/70 shadow-2xl shadow-teal-400/30 aurora">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
                Upload & Analyze
              </CardTitle>
              <CardDescription className="text-teal-600 text-lg">
                Get instant AI-powered livestock classification
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Image Upload Section */}
              <motion.div 
                className="space-y-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                                         className="block w-full h-64 border-2 border-dashed border-teal-400/70 rounded-2xl bg-gradient-to-br from-cyan-200/60 via-teal-200/50 to-emerald-200/60 hover:from-cyan-300/70 hover:via-teal-300/60 hover:to-emerald-300/70 transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div 
                      className="flex flex-col items-center justify-center h-full text-center p-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end justify-center pb-4">
                            <span className="text-white text-sm font-medium">Click to change image</span>
                          </div>
                        </div>
                      ) : (
                        <>
                                                      <motion.div
                              className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 sparkle"
                              whileHover={{ rotate: 5 }}
                            >
                            <Upload className="w-10 h-10 text-white" />
                          </motion.div>
                          <p className="text-teal-700 text-lg font-medium mb-2">
                            Drop your image here or click to browse
                          </p>
                          <p className="text-teal-600 text-sm">
                            Supports JPEG, PNG, WebP (Max 10MB)
                          </p>
                        </>
                      )}
                    </motion.div>
                  </label>
                </div>
              </motion.div>

              {/* Farm Information Section */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                                                                   <div className="space-y-2">
                    <label className="text-teal-700 text-sm font-medium">Farm ID</label>
                    <input
                      type="text"
                      value={farmData.farmId}
                      onChange={(e) => handleFarmDataChange('farmId', e.target.value)}
                      placeholder="Enter farm ID"
                      className="w-full px-4 py-3 bg-white/80 border border-teal-300/60 rounded-xl text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                
                                                                    <div className="space-y-2">
                    <label className="text-teal-700 text-sm font-medium">Farm Name</label>
                    <input
                      type="text"
                      value={farmData.farmName}
                      onChange={(e) => handleFarmDataChange('farmName', e.target.value)}
                      placeholder="Enter farm name"
                      className="w-full px-4 py-3 bg-white/80 border border-teal-300/60 rounded-xl text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                
                                                                    <div className="space-y-2">
                    <label className="text-teal-700 text-sm font-medium">Location</label>
                    <input
                      type="text"
                      value={farmData.location}
                      onChange={(e) => handleFarmDataChange('location', e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 bg-white/80 border border-teal-300/60 rounded-xl text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
              </motion.div>

              {/* Analyze Button */}
              <motion.div 
                className="text-center pt-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                                      <Button
                      onClick={handleAnalyze}
                      disabled={!imagePreview || isAnalyzing}
                      className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed floating-dust"
                    >
                  {isAnalyzing ? (
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Analyzing...</span>
                    </motion.div>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Analyze Image</span>
                    </span>
                  )}
                </Button>
                </motion.div>
              </motion.div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl text-center ${
                      message.includes('Error') || message.includes('Failed')
                        ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                        : 'bg-emerald-600/90 border border-emerald-500 text-white font-semibold'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

                             {/* Results Display */}
               <AnimatePresence>
                 {result && (
                                       <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                                           className="mt-8 p-6 bg-gradient-to-br from-white/80 via-cyan-100/70 to-emerald-100/80 rounded-2xl border border-teal-300/50 shadow-lg firefly"
                    >
                     <h3 className="text-2xl font-bold text-teal-800 mb-4 text-center">
                       Analysis Results
                     </h3>
                     

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             <div className="space-y-4">
                         <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                           <h4 className="text-teal-700 font-semibold mb-2">Animal Details</h4>
                           <div className="space-y-2 text-teal-800">
                             <p><span className="text-teal-600">Type:</span> {result.classification.animalType}</p>
                             <p><span className="text-teal-600">Breed:</span> {result.classification.breed || 'Unknown'}</p>
                             <p><span className="text-teal-600">Gender:</span> {result.classification.gender || 'Unknown'}</p>
                             <p><span className="text-teal-600">Age:</span> {result.classification.age || 'Unknown'} years</p>
                           </div>
                         </div>
                        
                                                 <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                           <h4 className="text-teal-700 font-semibold mb-2">Measurements</h4>
                           <div className="space-y-2 text-teal-800">
                             <p><span className="text-teal-600">Body Length:</span> {result.classification.bodyLength} cm</p>
                             <p><span className="text-cyan-600">Height:</span> {result.classification.heightAtWithers} cm</p>
                             <p><span className="text-cyan-600">Chest Width:</span> {result.classification.chestWidth} cm</p>
                             <p><span className="text-cyan-600">Rump Angle:</span> {result.classification.rumpAngle}°</p>
                           </div>
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                                                 <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                           <h4 className="text-teal-700 font-semibold mb-2">Quality Scores</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-teal-800 mb-1">
                                <span>Overall Score</span>
                                <span className="font-semibold">{result.classification.overallScore}/100</span>
                              </div>
                              <div className="w-full bg-teal-200/60 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.classification.overallScore}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-teal-800 mb-1">
                                <span>Breed Score</span>
                                <span className="font-semibold">{result.classification.breedScore}/100</span>
                              </div>
                              <div className="w-full bg-teal-200/60 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.classification.breedScore}%` }}
                                  transition={{ duration: 1, delay: 0.7 }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-teal-800 mb-1">
                                <span>Conformation</span>
                                <span className="font-semibold">{result.classification.overallScore}/100</span>
                              </div>
                              <div className="w-full bg-teal-200/60 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.classification.conformationScore}%` }}
                                  transition={{ duration: 1, delay: 0.9 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                                                 <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                           <h4 className="text-teal-700 font-semibold mb-2">Confidence</h4>
                          <div className="text-center">
                            <motion.div
                              className="text-3xl font-bold text-teal-600 mb-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", delay: 1 }}
                            >
                              {(result.classification.confidence * 100).toFixed(1)}%
                            </motion.div>
                            <p className="text-teal-700 text-sm">AI Confidence Level</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                                         {result.classification.analysisNotes && (
                       <div className="mt-6 bg-white/70 p-4 rounded-xl border border-teal-200/60">
                         <h4 className="text-teal-700 font-semibold mb-2">Analysis Notes</h4>
                         <p className="text-teal-800 text-sm leading-relaxed">
                           {result.classification.analysisNotes}
                         </p>
                       </div>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
                 </motion.div>
       </div>
       
       {/* Empty container for scrolling space */}
       <div className="h-32"></div>
     </div>
   );
 }
