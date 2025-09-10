'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Target, ArrowLeft, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundParticles, FloatingOrbs, EnergyWaves, FloatingClouds, FlyingBirds, Butterflies, SunRays, FloatingFlowers, FloatingLeaves, RainDrops, Fireflies, FloatingBubbles, EnhancedClouds, FloatingFeathers, FloatingSeeds } from '@/components/ui/particles';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { ProtectedRoute } from '@/components/protected-route';
import { translateAnalysisNotes } from '@/lib/utils';
import { Skeleton, SkeletonCard, SkeletonText, SkeletonButton } from '@/components/ui/skeleton';
import { containerVariants, itemVariants, cardVariants, buttonVariants, iconVariants, quickTransitions } from '@/lib/transitions';

export default function UploadPage() {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Helper function to translate classification results
  const translateResult = (result: string) => {
    switch (result.toLowerCase()) {
      case 'cattle':
        return t('results.cattle');
      case 'buffalo':
        return t('results.buffalo');
      case 'human':
        return t('results.human');
      default:
        return t('results.unknown');
    }
  };
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
      formData.append('source', 'upload'); // Track source as upload

      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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
          transition={quickTransitions.normal}
          className="mb-8"
        >
          <Link href="/classify">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button variant="ghost" className="text-white hover:text-emerald-200 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('upload.backToOptions')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 rounded-3xl mb-6 shadow-2xl shadow-teal-500/40 sparkle breathe"
            variants={iconVariants}
            whileHover="hover"
            transition={quickTransitions.spring}
          >
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold text-emerald-800 mb-4 gentle-bounce">
            {t('upload.title')}
          </h1>
          
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            {t('upload.subtitle')}
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
                {t('upload.cardTitle')}
              </CardTitle>
              <CardDescription className="text-teal-600 text-lg">
                {t('upload.cardDescription')}
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
                            <span className="text-white text-sm font-medium">{t('upload.clickToChange')}</span>
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
                            {t('upload.dragDrop')}
                          </p>
                          <p className="text-teal-600 text-sm">
                            {t('upload.fileTypes')} ({t('upload.maxSize')})
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
                  <label className="text-teal-700 text-sm font-medium">{t('upload.farmId')}</label>
                  <input
                    type="text"
                    value={farmData.farmId}
                    onChange={(e) => handleFarmDataChange('farmId', e.target.value)}
                    placeholder={t('upload.farmIdPlaceholder')}
                    className="w-full px-4 py-3 bg-white/80 border border-teal-300/60 rounded-xl text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-teal-700 text-sm font-medium">{t('upload.farmName')}</label>
                  <input
                    type="text"
                    value={farmData.farmName}
                    onChange={(e) => handleFarmDataChange('farmName', e.target.value)}
                    placeholder={t('upload.farmNamePlaceholder')}
                    className="w-full px-4 py-3 bg-white/80 border border-teal-300/60 rounded-xl text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-teal-700 text-sm font-medium">{t('upload.location')}</label>
                  <input
                    type="text"
                    value={farmData.location}
                    onChange={(e) => handleFarmDataChange('location', e.target.value)}
                    placeholder={t('upload.locationPlaceholder')}
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
                        <span>{t('upload.analyzing')}</span>
                      </motion.div>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>{t('upload.analyze')}</span>
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

              {/* Loading State */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-8 p-6 bg-gradient-to-br from-white/80 via-cyan-100/70 to-emerald-100/80 rounded-2xl border border-teal-300/50 shadow-lg"
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Target className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-teal-800 mb-2">
                        {t('upload.analyzing')}
                      </h3>
                      <p className="text-teal-600">
                        {t('upload.analyzingDescription')}
                      </p>
                    </div>
                    
                    {/* Skeleton for results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <SkeletonCard />
                      </div>
                      <div className="space-y-4">
                        <SkeletonCard />
                      </div>
                    </div>
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
                          <h4 className="text-teal-700 font-semibold mb-2">{t('analysis.animalDetails')}</h4>
                          <div className="space-y-2 text-teal-800">
                            <p><span className="text-teal-600">{t('analysis.type')}:</span> {translateResult(result.classification.animalType)}</p>
                            <p><span className="text-teal-600">{t('analysis.breed')}:</span> {result.classification.breed || t('results.unknown')}</p>
                            <p><span className="text-teal-600">{t('analysis.gender')}:</span> {result.classification.gender || t('results.unknown')}</p>
                            <p><span className="text-teal-600">{t('analysis.age')}:</span> {result.classification.age || t('results.unknown')} {t('analysis.years')}</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                          <h4 className="text-teal-700 font-semibold mb-2">{t('analysis.measurements')}</h4>
                          <div className="space-y-2 text-teal-800">
                            <p><span className="text-teal-600">{t('analysis.bodyLength')}:</span> {result.classification.bodyLength} {t('analysis.cm')}</p>
                            <p><span className="text-cyan-600">{t('analysis.height')}:</span> {result.classification.heightAtWithers} {t('analysis.cm')}</p>
                            <p><span className="text-cyan-600">{t('analysis.chestWidth')}:</span> {result.classification.chestWidth} {t('analysis.cm')}</p>
                            <p><span className="text-cyan-600">{t('analysis.rumpAngle')}:</span> {result.classification.rumpAngle}{t('analysis.degrees')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white/70 p-4 rounded-xl border border-teal-200/60">
                          <h4 className="text-teal-700 font-semibold mb-2">{t('history.qualityScores')}</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-teal-800 mb-1">
                                <span>{t('analysis.overallScore')}</span>
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
                                <span>{t('analysis.breedScore')}</span>
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
                                <span>{t('analysis.conformationScore')}</span>
                                <span className="font-semibold">{result.classification.conformationScore}/100</span>
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
                            <p className="text-teal-700 text-sm">{t('analysis.confidenceLevel')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {result.classification.analysisNotes && (
                      <div className="mt-6 bg-white/70 p-4 rounded-xl border border-teal-200/60">
                        <h4 className="text-teal-700 font-semibold mb-2">{t('analysis.analysisNotes')}</h4>
                        <p className="text-teal-800 text-sm leading-relaxed">
                          {translateAnalysisNotes(result.classification.analysisNotes, t)}
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
    </ProtectedRoute>
  );
}
