import { NextRequest, NextResponse } from 'next/server';
import { analyzeAnimalImage } from '@/lib/gemini';
import { bufferToBase64, validateImageFile } from '@/lib/image-utils';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const { userId } = decoded;
    
    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please login again.' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const farmId = formData.get('farmId') as string;
    const farmName = formData.get('farmName') as string;
    const location = formData.get('location') as string;
    const source = formData.get('source') as string || 'upload'; // Track source: 'upload' or 'live'

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file
    const mockFile = {
      mimetype: file.type,
      size: file.size,
    } as Express.Multer.File;

    if (!validateImageFile(mockFile)) {
      return NextResponse.json(
        { error: 'Invalid image file. Please upload a valid image (JPEG, PNG, WebP) under 10MB.' },
        { status: 400 }
      );
    }

    // Convert to base64 for Gemini AI (no file saving)
    const imageBase64 = bufferToBase64(buffer);

    // Analyze image with Gemini AI
    const analysis = await analyzeAnimalImage(imageBase64);

    // Handle farm creation if farmId is provided
    let finalFarmId = null;
    if (farmId && farmName) {
      try {
        // Try to find existing farm first
        let farm = await prisma.farm.findUnique({
          where: { id: farmId }
        });

        if (!farm) {
          // Create new farm if it doesn't exist
          farm = await prisma.farm.create({
            data: {
              id: farmId,
              name: farmName,
              location: location || null,
            }
          });
        }
        finalFarmId = farm.id;
      } catch (farmError) {
        console.error('Farm creation error:', farmError);
        // Continue without farm if there's an error
        finalFarmId = null;
      }
    }

    // Save to database with user association and source tracking
    const classification = await prisma.animalClassification.create({
      data: {
        user: {
          connect: { id: userId } // Associate with logged-in user using connect
        },
        animalType: analysis.animalType || 'Human',
        imageUrl: '', // No image URL since we don't store images
        imagePath: '', // No image path since we don't store images
        bodyLength: analysis.measurements?.bodyLength || 0,
        heightAtWithers: analysis.measurements?.heightAtWithers || 0,
        chestWidth: analysis.measurements?.chestWidth || 0,
        rumpAngle: analysis.measurements?.rumpAngle || 0,
        bodyCondition: analysis.measurements?.bodyCondition || 5,
        overallScore: analysis.scores?.overallScore || 50,
        breedScore: analysis.scores?.breedScore || 50,
        conformationScore: analysis.scores?.conformationScore || 50,
        breed: analysis.metadata?.breed || 'Unknown',
        age: analysis.metadata?.age || undefined,
        weight: analysis.metadata?.weight || undefined,
        gender: analysis.metadata?.gender || 'Unknown',
        farm: finalFarmId ? {
          connect: { id: finalFarmId }
        } : undefined, // Connect to farm if farmId exists
        farmName: farmName || null,
        location: location || null,
        confidence: analysis.confidence || 0.5,
        analysisNotes: analysis.analysisNotes || 'Analysis completed',
        source: source, // Track whether this came from upload or live feed
      },
    });

    return NextResponse.json({
      success: true,
      classification,
      analysis,
    });

  } catch (error) {
    console.error('Classification error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Foreign key constraint violated')) {
        return NextResponse.json(
          { error: 'Invalid farm ID provided. Please check your farm information.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to classify animal image. Please try again.' },
      { status: 500 }
    );
  }
}
