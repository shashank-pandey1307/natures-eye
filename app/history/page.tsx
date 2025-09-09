'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Eye, Trash2, Filter, Leaf, BarChart3, MapPin, Calendar, User, Camera, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { ProtectedRoute } from '@/components/protected-route';
import { translateAnalysisNotes } from '@/lib/utils';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl mb-6 shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Leaf className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-emerald-100 text-lg">Loading classifications...</p>
          </div>
        </div>
      </div>
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
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 px-4 py-2 rounded-2xl border border-emerald-500/30">
              <User className="h-4 w-4 text-emerald-300" />
              <span className="text-emerald-200 text-sm">Welcome, {user.name}</span>
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
                            {translateAnalysisNotes(classification.analysisNotes, t)}
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
    </ProtectedRoute>
  );
}
