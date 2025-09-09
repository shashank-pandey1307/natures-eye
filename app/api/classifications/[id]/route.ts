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

// GET /api/classifications/[id] - Get specific classification
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params;

    // Find classification that belongs to the user
    const classification = await prisma.animalClassification.findFirst({
      where: {
        id: id,
        user: {
          id: userId
        }, // Ensure user can only access their own classifications
      },
      include: {
        farm: true,
        user: true,
      },
    });

    if (!classification) {
      return NextResponse.json(
        { error: 'Classification not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: classification,
    });

  } catch (error) {
    console.error('Error fetching classification:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classification' },
      { status: 500 }
    );
  }
}

// DELETE /api/classifications/[id] - Delete specific classification
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params;

    // Find and delete classification that belongs to the user
    const classification = await prisma.animalClassification.findFirst({
      where: {
        id: id,
        user: {
          id: userId
        }, // Ensure user can only delete their own classifications
      },
    });

    if (!classification) {
      return NextResponse.json(
        { error: 'Classification not found or access denied' },
        { status: 404 }
      );
    }

    // Delete the classification
    await prisma.animalClassification.delete({
      where: { id: id },
    });

    return NextResponse.json({
      success: true,
      message: 'Classification deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting classification:', error);
    return NextResponse.json(
      { error: 'Failed to delete classification' },
      { status: 500 }
    );
  }
}

// PUT /api/classifications/[id] - Update specific classification
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params;
    const body = await request.json();

    // Find classification that belongs to the user
    const existingClassification = await prisma.animalClassification.findFirst({
      where: {
        id: id,
        user: {
          id: userId
        }, // Ensure user can only update their own classifications
      },
    });

    if (!existingClassification) {
      return NextResponse.json(
        { error: 'Classification not found or access denied' },
        { status: 404 }
      );
    }

    // Update the classification
    const updatedClassification = await prisma.animalClassification.update({
      where: { id: id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
      include: {
        farm: true,
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedClassification,
      message: 'Classification updated successfully',
    });

  } catch (error) {
    console.error('Error updating classification:', error);
    return NextResponse.json(
      { error: 'Failed to update classification' },
      { status: 500 }
    );
  }
}
