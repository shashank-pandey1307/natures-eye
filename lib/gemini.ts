import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface AnimalClassificationResult {
  animalType: 'cattle' | 'buffalo' | 'Human';
  measurements: {
    bodyLength: number;
    heightAtWithers: number;
    chestWidth: number;
    rumpAngle: number;
    bodyCondition: number;
  };
  scores: {
    overallScore: number;
    breedScore: number;
    conformationScore: number;
  };
  metadata: {
    breed?: string;
    age?: number;
    weight?: number;
    gender?: string;
  };
  confidence: number;
  analysisNotes: string;
}

export async function analyzeAnimalImage(imageBase64: string): Promise<AnimalClassificationResult> {
  // Check if we should use mock mode (when API key is not set or for testing)
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('Using mock mode - no valid API key found');
    // Randomly return different types for testing
    const mockTypes = ['cattle', 'buffalo', 'Human'] as const;
    const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
    return {
      animalType: randomType,
      measurements: {
        bodyLength: 180,
        heightAtWithers: 140,
        chestWidth: 60,
        rumpAngle: 15,
        bodyCondition: 7,
      },
      scores: {
        overallScore: 85,
        breedScore: 80,
        conformationScore: 90,
      },
      metadata: {
        breed: 'Holstein',
        age: 4,
        weight: 650,
        gender: 'female',
      },
      confidence: 0.8,
      analysisNotes: 'Mock analysis - please set up your Gemini API key for real analysis'
    };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Add retry logic for rate limiting
  const maxRetries = 3;
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = `
      Analyze this image and classify what you see. This could be a livestock animal (cattle or buffalo) or a human. Provide detailed measurements and classification scores.
      
      Please provide the following information in EXACT JSON format with these exact field names:
      
      {
        "animalType": "cattle", "buffalo", or "Human",
        "measurements": {
          "bodyLength": number (length from shoulder to rump in cm),
          "heightAtWithers": number (height at the highest point of the back in cm),
          "chestWidth": number (width of the chest in cm),
          "rumpAngle": number (angle of the rump in degrees),
          "bodyCondition": number (body condition score 1-9 scale)
        },
        "scores": {
          "overallScore": number (0-100 overall quality score),
          "breedScore": number (0-100 breed-specific characteristics score),
          "conformationScore": number (0-100 physical conformation score)
        },
        "metadata": {
          "breed": "string (estimated breed if identifiable)",
          "age": number (estimated age in years),
          "weight": number (estimated weight in kg),
          "gender": "male" or "female"
        },
        "confidence": number (confidence level 0-1),
        "analysisNotes": "string (brief notes about the analysis)"
      }
      
      Return ONLY the JSON object without any additional text, markdown formatting, or explanations.
      `;

      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      console.log('AI Response:', text);
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('No valid JSON found in response');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      console.log('Parsed analysis:', analysis);
      
      // Validate the response structure with more flexibility
      if (!analysis.animalType) {
        analysis.animalType = 'Human'; // Default to Human if not specified
      }
      
      if (!analysis.measurements) {
        analysis.measurements = {};
      }
      
      if (!analysis.scores) {
        analysis.scores = {};
      }
      
             return {
         animalType: analysis['Animal Type'] || analysis.animalType || 'Human',
         measurements: {
           bodyLength: (analysis['Physical Measurements (in cm)']?.bodyLength || analysis.measurements?.bodyLength || 0),
           heightAtWithers: (analysis['Physical Measurements (in cm)']?.heightAtWithers || analysis.measurements?.heightAtWithers || 0),
           chestWidth: (analysis['Physical Measurements (in cm)']?.chestWidth || analysis.measurements?.chestWidth || 0),
           rumpAngle: (analysis['Physical Measurements (in cm)']?.rumpAngle || analysis.measurements?.rumpAngle || 0),
           bodyCondition: (analysis['Physical Measurements (in cm)']?.bodyCondition || analysis.measurements?.bodyCondition || 5),
         },
         scores: {
           overallScore: (analysis['Classification Scores (0-100)']?.overallScore || analysis.scores?.overallScore || 50),
           breedScore: (analysis['Classification Scores (0-100)']?.breedScore || analysis.scores?.breedScore || 50),
           conformationScore: (analysis['Classification Scores (0-100)']?.conformationScore || analysis.scores?.conformationScore || 50),
         },
         metadata: {
           breed: (analysis.Metadata?.breed || analysis.metadata?.breed || 'Unknown'),
           age: (analysis.Metadata?.age || analysis.metadata?.age || undefined),
           weight: (analysis.Metadata?.weight || analysis.metadata?.weight || undefined),
           gender: (analysis.Metadata?.gender || analysis.metadata?.gender || 'Unknown'),
         },
         confidence: (analysis.Analysis?.confidence || analysis.confidence || 0.5),
         analysisNotes: (analysis.Analysis?.analysisNotes || analysis.analysisNotes || 'Analysis completed')
       };
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      // If it's a rate limit error, wait before retrying
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        const waitTime = attempt * 2000; // Wait 2s, 4s, 6s
        console.log(`Rate limited, waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      // For other errors, break immediately
      break;
    }
  }
  
  // If all retries failed, return fallback response
  console.error('All retry attempts failed:', lastError);
  return {
    animalType: 'Human' as const,
    measurements: {
      bodyLength: 0,
      heightAtWithers: 0,
      chestWidth: 0,
      rumpAngle: 0,
      bodyCondition: 5,
    },
    scores: {
      overallScore: 50,
      breedScore: 50,
      conformationScore: 50,
    },
    metadata: {
      breed: 'Unknown',
      age: undefined,
      weight: undefined,
      gender: 'Unknown',
    },
    confidence: 0.1,
    analysisNotes: 'Analysis failed - using default values'
  };
}

export async function extractImageMeasurements(imageBase64: string): Promise<Partial<AnimalClassificationResult>> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Analyze this livestock image and extract only the physical measurements.
  
  Focus on measuring:
  - Body length (shoulder to rump)
  - Height at withers
  - Chest width
  - Rump angle
  - Body condition score (1-9)
  
  Return measurements in JSON format with only numeric values in cm (except body condition which is 1-9 scale).
  `;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: "image/jpeg"
    }
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error extracting measurements:', error);
    throw new Error('Failed to extract image measurements');
  }
}
