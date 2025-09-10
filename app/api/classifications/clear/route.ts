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

export async function DELETE(request: NextRequest) {
  try {
    // Verify user authentication
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const { userId } = decoded;

    // Delete all classifications for the user
    const deletedCount = await prisma.animalClassification.deleteMany({
      where: {
        user: {
          id: userId
        }
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully cleared ${deletedCount.count} classifications`,
      deletedCount: deletedCount.count,
    });

  } catch (error) {
    console.error('Error clearing classifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear classifications' },
      { status: 500 }
    );
  }
}
