'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Eye, Trash2, Filter } from 'lucide-react';

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
  createdAt: string;
}

export default function HistoryPage() {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    animalType: '',
    farmId: '',
  });

  useEffect(() => {
    fetchClassifications();
  }, [filter]);

  const fetchClassifications = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.animalType) params.append('animalType', filter.animalType);
      if (filter.farmId) params.append('farmId', filter.farmId);

      const response = await fetch(`/api/classifications?${params}`);
      const data = await response.json();

      if (data.success) {
        setClassifications(data.data);
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
      });

      if (response.ok) {
        setClassifications(classifications.filter(c => c.id !== id));
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading classifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <History className="h-8 w-8" />
          Classification History
        </h1>
        <p className="text-xl text-muted-foreground">
          View and manage past animal classifications
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Animal Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={filter.animalType}
                onChange={(e) => setFilter({ ...filter, animalType: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="cattle">Cattle</option>
                <option value="buffalo">Buffalo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Farm ID</label>
              <input
                type="text"
                placeholder="Enter Farm ID"
                className="w-full p-2 border rounded-md"
                value={filter.farmId}
                onChange={(e) => setFilter({ ...filter, farmId: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classifications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {classifications.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <History className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No classifications found</p>
          </div>
        ) : (
          classifications.map((classification) => (
            <Card key={classification.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="capitalize">{classification.animalType}</CardTitle>
                    <CardDescription>
                      {formatDate(classification.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(classification.imageUrl, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(classification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Image Preview */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={classification.imageUrl}
                    alt={`${classification.animalType} classification`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Overall Score:</span>
                    <span className="ml-1 text-primary font-bold">
                      {classification.overallScore}/100
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Confidence:</span>
                    <span className="ml-1 text-green-600 font-bold">
                      {(classification.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Measurements */}
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Body Length: {classification.bodyLength} cm</div>
                  <div>Height: {classification.heightAtWithers} cm</div>
                  <div>Chest Width: {classification.chestWidth} cm</div>
                  <div>Body Condition: {classification.bodyCondition}/9</div>
                </div>

                {/* Farm Info */}
                {classification.farmName && (
                  <div className="text-xs text-gray-500">
                    <div>Farm: {classification.farmName}</div>
                    {classification.location && <div>Location: {classification.location}</div>}
                  </div>
                )}

                {/* Additional Info */}
                {(classification.breed || classification.age || classification.gender) && (
                  <div className="text-xs text-gray-600">
                    {classification.breed && <div>Breed: {classification.breed}</div>}
                    {classification.age && <div>Age: {classification.age} years</div>}
                    {classification.gender && <div>Gender: {classification.gender}</div>}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
