const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    
    console.log('Setting up database schema...');
    
    // Create users table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        username TEXT UNIQUE,
        password TEXT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Create animal_classifications table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS animal_classifications (
        id TEXT PRIMARY KEY,
        animalType TEXT,
        imageUrl TEXT,
        imagePath TEXT,
        bodyLength FLOAT,
        heightAtWithers FLOAT,
        chestWidth FLOAT,
        rumpAngle FLOAT,
        bodyCondition FLOAT,
        overallScore FLOAT,
        breedScore FLOAT,
        conformationScore FLOAT,
        breed TEXT,
        age INT,
        weight FLOAT,
        gender TEXT,
        farmId TEXT,
        farmName TEXT,
        location TEXT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW(),
        analysisNotes TEXT,
        confidence FLOAT,
        userId TEXT NOT NULL,
        source TEXT DEFAULT 'upload',
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (farmId) REFERENCES farms(id) ON DELETE SET NULL
      )
    `;
    
    // Create user_history table for separate user-specific history
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS user_history (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        animalType TEXT,
        imageUrl TEXT,
        imagePath TEXT,
        bodyLength FLOAT,
        heightAtWithers FLOAT,
        chestWidth FLOAT,
        rumpAngle FLOAT,
        bodyCondition FLOAT,
        overallScore FLOAT,
        breedScore FLOAT,
        conformationScore FLOAT,
        breed TEXT,
        age INT,
        weight FLOAT,
        gender TEXT,
        farmId TEXT,
        farmName TEXT,
        location TEXT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW(),
        analysisNotes TEXT,
        confidence FLOAT,
        source TEXT DEFAULT 'upload',
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    // Create farms table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS farms (
        id TEXT PRIMARY KEY,
        name TEXT,
        location TEXT,
        contactInfo TEXT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Database setup complete!');
    console.log('Tables created: users, animal_classifications, user_history, farms');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
