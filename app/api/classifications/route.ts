import { NextRequest, NextResponse } from 'next/server';
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

// GET /api/classifications - Fetch user-specific classifications
export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);
    
    // Get filter parameters
    const animalType = searchParams.get('animalType');
    const farmId = searchParams.get('farmId');
    const source = searchParams.get('source'); // "upload" or "live"
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build where clause for user-specific filtering
    const whereClause: any = {
      user: {
        id: userId
      },
    };

    // Add optional filters
    if (animalType) {
      whereClause.animalType = animalType;
    }
    if (farmId) {
      whereClause.farm = {
        id: farmId
      };
    }
    if (source) {
      whereClause.source = source;
    }

    // Fetch user's classifications with pagination
    const [classifications, totalCount] = await Promise.all([
      prisma.animalClassification.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        include: {
          farm: true,
        },
      }),
      prisma.animalClassification.count({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: classifications,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching classifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classifications' },
      { status: 500 }
    );
  }
}

// POST /api/classifications - Save a new classification to user history
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
    const body = await request.json();

    // Validate required fields
    const {
      animalType,
      imageUrl,
      imagePath,
      bodyLength,
      heightAtWithers,
      chestWidth,
      rumpAngle,
      bodyCondition,
      overallScore,
      breedScore,
      conformationScore,
      breed,
      age,
      weight,
      gender,
      farmId,
      farmName,
      location,
      confidence,
      analysisNotes,
      source = 'upload', // Default to upload, can be 'live'
    } = body;

    if (!animalType || !imageUrl || !overallScore) {
      return NextResponse.json(
        { error: 'Missing required fields: animalType, imageUrl, overallScore' },
        { status: 400 }
      );
    }

    // Create new classification
    const classification = await prisma.animalClassification.create({
      data: {
        user: {
          connect: { id: userId }
        },
        animalType,
        imageUrl,
        imagePath: imagePath || '',
        bodyLength,
        heightAtWithers,
        chestWidth,
        rumpAngle,
        bodyCondition,
        overallScore,
        breedScore,
        conformationScore,
        breed,
        age,
        weight,
        gender,
        farm: farmId ? {
          connect: { id: farmId }
        } : undefined, // Connect to farm if farmId exists
        farmName,
        location,
        confidence,
        analysisNotes,
        source,
      },
      include: {
        farm: true,
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: classification,
      message: 'Classification saved successfully',
    });

  } catch (error) {
    console.error('Error saving classification:', error);
    return NextResponse.json(
      { error: 'Failed to save classification' },
      { status: 500 }
    );
  }
}
