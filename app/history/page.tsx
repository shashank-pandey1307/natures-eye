'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Eye, Trash2, Filter, Leaf, BarChart3, MapPin, Calendar, User, Camera, Upload, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { ProtectedRoute } from '@/components/protected-route';
import { translateAnalysisNotes } from '@/lib/utils';
import { ClassificationSkeleton, FilterSkeleton, SkeletonCard } from '@/components/ui/skeleton';
import { containerVariants, itemVariants, fadeInVariants, quickTransitions } from '@/lib/transitions';

interface Classification {
  id: string;
  animalType: string;
  imageUrl: string;
  bodyLength: number;
  heightAtWithers: number;
  chestWidth: number;
  rumpAngle: number;
  bodyCondition: number;
  overallScore: number;
  breedScore: number;
  conformationScore: number;
  breed?: string;
  age?: number;
  weight?: number;
  gender?: string;
  farmId?: string;
  farmName?: string;
  location?: string;
  confidence: number;
  analysisNotes?: string;
  source: string; // 'upload' or 'live'
  createdAt: string;
}

export default function HistoryPage() {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [classifications, setClassifications] = useState<Classification[]>([]);
  
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
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [filter, setFilter] = useState({
    animalType: '',
    farmId: '',
    source: '', // Filter by source: 'upload' or 'live'
  });

  useEffect(() => {
    fetchClassifications();
  }, [filter]);

  const fetchClassifications = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      if (filter.animalType) params.append('animalType', filter.animalType);
      if (filter.farmId) params.append('farmId', filter.farmId);
      if (filter.source) params.append('source', filter.source);

      const response = await fetch(`/api/classifications?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setClassifications(data.data);
      } else if (response.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error fetching classifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this classification?')) return;

    try {
      const response = await fetch(`/api/classifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setClassifications(classifications.filter(c => c.id !== id));
      } else if (response.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error deleting classification:', error);
    }
  };

  const handleClearAll = async () => {
    setClearing(true);
    try {
      const response = await fetch('/api/classifications/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setClassifications([]);
        setShowClearConfirm(false);
        alert(`Successfully cleared ${data.deletedCount} classifications`);
      } else {
        // Handle error without redirecting
        console.error('Clear history error:', data.error);
        alert(`Error: ${data.error || 'Failed to clear history'}`);
      }
    } catch (error) {
      console.error('Error clearing classifications:', error);
      alert('Failed to clear history. Please try again.');
    } finally {
      setClearing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900">
          <div className="container mx-auto px-4 py-12">
            {/* Header Skeleton */}
            <motion.div 
              className="text-center mb-12"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 rounded-3xl mb-6 shadow-2xl shadow-emerald-500/30">
                <History className="h-10 w-10 text-white" />
              </div>
              <div className="h-12 bg-gradient-to-r from-emerald-300/20 to-cyan-400/20 rounded-lg mb-4 max-w-md mx-auto"></div>
              <div className="h-6 bg-gradient-to-r from-emerald-200/20 to-emerald-100/20 rounded-lg max-w-2xl mx-auto mb-4"></div>
              <div className="h-8 bg-gradient-to-r from-emerald-300/20 to-emerald-200/20 rounded-lg max-w-xs mx-auto"></div>
            </motion.div>

            {/* Filter Skeleton */}
            <FilterSkeleton />

            {/* Classifications Skeleton */}
            <ClassificationSkeleton />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900">
        <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 rounded-3xl mb-6 shadow-2xl shadow-emerald-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <History className="h-10 w-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-4">
            {t('history.title')}
          </h1>
          
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed mb-4">
            {t('history.subtitle')}
          </p>
          
          {user && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-emerald-900/40 px-4 py-2 rounded-2xl border border-emerald-500/30">
                <User className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-200 text-sm">Welcome, {user.name}</span>
              </div>
              
              {classifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => setShowClearConfirm(true)}
                    variant="outline"
                    className="border-red-500/40 text-red-200 hover:bg-red-500/20 hover:border-red-400 hover:text-red-100 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All History
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="mb-8 bg-gradient-to-br from-slate-800/90 via-emerald-900/80 to-slate-800/90 backdrop-blur-2xl border-emerald-500/30 shadow-2xl shadow-emerald-600/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-900/50 via-teal-900/40 to-emerald-900/50">
              <CardTitle className="flex items-center gap-3 text-emerald-100 text-2xl">
                <Filter className="h-6 w-6" />
                {t('history.filters')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-emerald-200 text-sm font-medium flex items-center gap-2">
                    <Leaf size={16} />
                    {t('history.animalType')}
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-emerald-900/60 border border-emerald-500/40 rounded-2xl text-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-300"
                    value={filter.animalType}
                    onChange={(e) => setFilter({ ...filter, animalType: e.target.value })}
                  >
                    <option value="">{t('history.allTypes')}</option>
                    <option value="cattle">{t('results.cattle')}</option>
                    <option value="buffalo">{t('results.buffalo')}</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-emerald-200 text-sm font-medium flex items-center gap-2">
                    <MapPin size={16} />
                    {t('history.farmId')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('upload.farmIdPlaceholder')}
                    className="w-full px-4 py-3 bg-emerald-900/60 border border-emerald-500/40 rounded-2xl text-emerald-100 placeholder-emerald-300 focus:outline-none focus:ring-3 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-300"
                    value={filter.farmId}
                    onChange={(e) => setFilter({ ...filter, farmId: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-emerald-200 text-sm font-medium flex items-center gap-2">
                    <Camera size={16} />
                    {t('history.source')}
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-emerald-900/60 border border-emerald-500/40 rounded-2xl text-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-300"
                    value={filter.source}
                    onChange={(e) => setFilter({ ...filter, source: e.target.value })}
                  >
                    <option value="">{t('history.allSources')}</option>
                    <option value="upload">{t('history.uploaded')}</option>
                    <option value="live">{t('history.live')}</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Classifications List */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {classifications.length === 0 ? (
            <motion.div 
              className="col-span-full text-center py-16"
              variants={itemVariants}
            >
              <History className="h-20 w-20 mx-auto text-emerald-400/30 mb-6" />
              <p className="text-emerald-200 text-lg">{t('history.noClassifications')}</p>
              <p className="text-emerald-300 text-sm mt-2">{t('history.startAnalyzing')}</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {classifications.map((classification, index) => (
                <motion.div
                  key={classification.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-gradient-to-br from-slate-800/90 via-emerald-900/80 to-slate-800/90 backdrop-blur-2xl border-emerald-500/30 shadow-2xl shadow-emerald-600/20 rounded-3xl overflow-hidden hover:shadow-emerald-500/30 transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-emerald-900/50 via-teal-900/40 to-emerald-900/50 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="capitalize text-emerald-100 text-xl flex items-center gap-2">
                            <Leaf className="h-5 w-5" />
                            {translateResult(classification.animalType)}
                          </CardTitle>
                          <CardDescription className="text-emerald-200 flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(classification.createdAt)}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {classification.source === 'live' ? (
                              <div className="flex items-center gap-1 bg-teal-900/40 px-2 py-1 rounded-lg border border-teal-500/30">
                                <Camera className="h-3 w-3 text-teal-300" />
                                <span className="text-teal-200 text-xs">{t('history.live')}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 bg-emerald-900/40 px-2 py-1 rounded-lg border border-emerald-500/30">
                                <Upload className="h-3 w-3 text-emerald-300" />
                                <span className="text-emerald-200 text-xs">{t('history.uploaded')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(classification.imageUrl, '_blank')}
                            className="border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(classification.id)}
                            className="border-red-500/40 text-red-200 hover:bg-red-500/20 hover:border-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-6">
                      {/* Enhanced Image Preview */}
                      <div className="aspect-video bg-emerald-900/40 rounded-2xl overflow-hidden border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-300">
                        <img
                          src={classification.imageUrl}
                          alt={`${translateResult(classification.animalType)} classification`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Enhanced Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-500/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-300 mb-1">
                              {classification.overallScore}
                            </div>
                            <div className="text-emerald-200 text-sm">{t('analysis.overallScore')}</div>
                          </div>
                        </div>
                        <div className="bg-teal-900/40 p-4 rounded-2xl border border-teal-500/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-300 mb-1">
                              {(classification.confidence * 100).toFixed(1)}%
                            </div>
                            <div className="text-teal-200 text-sm">{t('history.confidence')}</div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Measurements */}
                      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                        <h4 className="text-emerald-200 font-semibold mb-3 flex items-center gap-2">
                          <BarChart3 size={18} />
                          {t('analysis.measurements')}
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-emerald-100">
                            <span className="text-emerald-300">{t('analysis.bodyLength')}:</span> {classification.bodyLength} {t('analysis.cm')}
                          </div>
                          <div className="text-emerald-100">
                            <span className="text-emerald-300">{t('analysis.height')}:</span> {classification.heightAtWithers} {t('analysis.cm')}
                          </div>
                          <div className="text-emerald-100">
                            <span className="text-emerald-300">{t('analysis.chestWidth')}:</span> {classification.chestWidth} {t('analysis.cm')}
                          </div>
                          <div className="text-emerald-100">
                            <span className="text-emerald-300">{t('history.bodyCondition')}:</span> {classification.bodyCondition}/9
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Farm Info */}
                      {classification.farmName && (
                        <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-500/20">
                          <h4 className="text-emerald-200 font-semibold mb-2 flex items-center gap-2">
                            <MapPin size={16} />
                            {t('history.farmInfo')}
                          </h4>
                          <div className="text-emerald-100 text-sm space-y-1">
                            <div>{t('upload.farmName')}: {classification.farmName}</div>
                            {classification.location && <div>{t('upload.location')}: {classification.location}</div>}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Additional Info */}
                      {(classification.breed || classification.age || classification.gender) && (
                        <div className="bg-teal-900/40 p-4 rounded-2xl border border-teal-500/20">
                          <h4 className="text-teal-200 font-semibold mb-2">{t('history.additionalDetails')}</h4>
                          <div className="text-teal-100 text-sm space-y-1">
                            {classification.breed && <div>{t('history.breed')}: {classification.breed}</div>}
                            {classification.age && <div>{t('history.age')}: {classification.age} {t('history.years')}</div>}
                            {classification.gender && <div>{t('history.gender')}: {classification.gender}</div>}
                          </div>
                        </div>
                      )}

                      {/* Analysis Notes */}
                      {classification.analysisNotes && (
                        <div className="bg-white/10 p-4 rounded-2xl border border-emerald-500/20">
                          <h4 className="text-emerald-200 font-semibold mb-2">{t('analysis.analysisNotes')}</h4>
                          <p className="text-emerald-100 text-sm leading-relaxed">
                            {translateAnalysisNotes(classification.analysisNotes, t as any)}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
        </div>
      </div>

      {/* Clear History Confirmation Dialog */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800/95 via-emerald-900/90 to-slate-800/95 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                >
                  <AlertTriangle className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-red-200 mb-4">
                  Clear All History?
                </h3>
                
                <p className="text-emerald-200 mb-6 leading-relaxed">
                  This action will permanently delete all {classifications.length} classification records. 
                  This cannot be undone.
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    variant="outline"
                    className="border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400"
                    disabled={clearing}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    onClick={handleClearAll}
                    disabled={clearing}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                  >
                    {clearing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Clearing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
