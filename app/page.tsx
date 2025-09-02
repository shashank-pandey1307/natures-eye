'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, FileText, BarChart3 } from 'lucide-react';

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
      // Create temporary preview URL
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFarmDataChange = (field: keyof typeof farmData, value: string) => {
    setFarmData({ ...farmData, [field]: value });
    // Clear messages when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    // Validate farm data
    if (farmData.farmId && !farmData.farmName) {
      setMessage('Please enter a farm name when providing a farm ID');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setMessage(null); // Clear previous messages
    
    // Clear previous file selection
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
      // Clear image preview after analysis
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Nature's Eye
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-Powered Animal Classification System
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center border ${
          message.includes('Error') || message.includes('Failed') || message.includes('Please enter')
            ? 'bg-red-50 text-red-800 border-red-200'
            : 'bg-green-50 text-green-800 border-green-200'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Animal Image
            </CardTitle>
            <CardDescription>
              Upload an image of cattle or buffalo for AI-powered classification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Farm Information */}
            <div className="space-y-3">
              <h3 className="font-medium">Farm Information (Optional)</h3>
              <input
                type="text"
                placeholder="Farm ID (optional)"
                className="w-full p-2 border rounded-md"
                value={farmData.farmId}
                onChange={(e) => handleFarmDataChange('farmId', e.target.value)}
              />
              <input
                type="text"
                placeholder="Farm Name (required if Farm ID provided)"
                className="w-full p-2 border rounded-md"
                value={farmData.farmName}
                onChange={(e) => handleFarmDataChange('farmName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location (optional)"
                className="w-full p-2 border rounded-md"
                value={farmData.location}
                onChange={(e) => handleFarmDataChange('location', e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <h3 className="font-medium">Image Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, WebP up to 10MB
                  </p>
                </label>
              </div>
                             {selectedFile && (
                 <div className="space-y-2">
                   <p className="text-sm text-green-600">
                     Selected: {selectedFile.name}
                   </p>
                   {imagePreview && (
                     <div className="relative">
                       <img 
                         src={imagePreview} 
                         alt="Preview" 
                         className="w-full h-32 object-cover rounded-lg border"
                       />
                       <p className="text-xs text-gray-500 mt-1 text-center">
                         Preview (will be deleted after analysis)
                       </p>
                     </div>
                   )}
                 </div>
               )}
            </div>

                         <div className="flex gap-2">
               <Button
                 onClick={handleAnalyze}
                 disabled={!selectedFile || isAnalyzing}
                 className="flex-1"
               >
                 {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
               </Button>
               {selectedFile && !isAnalyzing && (
                 <Button
                   onClick={() => {
                     setSelectedFile(null);
                     if (imagePreview) {
                       URL.revokeObjectURL(imagePreview);
                       setImagePreview(null);
                     }
                   }}
                   variant="outline"
                   className="px-4"
                 >
                   Clear
                 </Button>
               )}
             </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              AI-generated classification and measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Analyzing image with AI...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Animal Type */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-medium text-primary mb-2">Animal Type</h3>
                  <p className="text-lg capitalize">{result.analysis.animalType}</p>
                </div>

                {/* Measurements */}
                <div>
                  <h3 className="font-medium mb-2">Physical Measurements</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Body Length: {result.analysis.measurements.bodyLength} cm</div>
                    <div>Height at Withers: {result.analysis.measurements.heightAtWithers} cm</div>
                    <div>Chest Width: {result.analysis.measurements.chestWidth} cm</div>
                    <div>Rump Angle: {result.analysis.measurements.rumpAngle}°</div>
                    <div>Body Condition: {result.analysis.measurements.bodyCondition}/9</div>
                  </div>
                </div>

                {/* Scores */}
                <div>
                  <h3 className="font-medium mb-2">Classification Scores</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Score:</span>
                      <span className="font-medium">{result.analysis.scores.overallScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breed Score:</span>
                      <span className="font-medium">{result.analysis.scores.breedScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conformation Score:</span>
                      <span className="font-medium">{result.analysis.scores.conformationScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                {result.analysis.metadata && (
                  <div>
                    <h3 className="font-medium mb-2">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {result.analysis.metadata.breed && (
                        <div>Breed: {result.analysis.metadata.breed}</div>
                      )}
                      {result.analysis.metadata.age && (
                        <div>Age: {result.analysis.metadata.age} years</div>
                      )}
                      {result.analysis.metadata.weight && (
                        <div>Weight: {result.analysis.metadata.weight} kg</div>
                      )}
                      {result.analysis.metadata.gender && (
                        <div>Gender: {result.analysis.metadata.gender}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Confidence */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Confidence Level:</span>
                    <span className="text-green-600 font-bold">
                      {(result.analysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Analysis Notes */}
                {result.analysis.analysisNotes && (
                  <div>
                    <h3 className="font-medium mb-2">Analysis Notes</h3>
                    <p className="text-sm text-gray-600">{result.analysis.analysisNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload an image to see analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
