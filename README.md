# Nature's Eye - Animal Classification System

An AI-powered Next.js application for classifying cattle and buffaloes using image analysis and Google's Gemini AI API.

## Features

- **Image-based Animal Classification**: Automatically classify cattle and buffaloes from uploaded images
- **Physical Trait Analysis**: Extract and quantify body structure parameters (body length, height at withers, chest width, rump angle, etc.)
- **AI-Powered Analysis**: Uses Google Gemini AI for accurate classification and measurements
- **Objective Scoring**: Generate consistent classification scores for overall quality, breed characteristics, and conformation
- **Data Management**: Auto-record and store classification data in a structured PostgreSQL database
- **BPA Integration Ready**: Designed for seamless integration with Business Process Automation systems
- **User-Friendly Interface**: Simple, intuitive interface for field personnel with minimal technical skills
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: Google Gemini AI API
- **Database**: PostgreSQL with Prisma ORM
- **Image Processing**: Sharp for image optimization
- **File Upload**: Built-in Next.js API routes

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Gemini AI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd natures-eye
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/natures_eye_db"
   
   # Google Gemini AI API
   GEMINI_API_KEY="your_gemini_api_key_here"
   
   # Next.js Configuration
   NEXTAUTH_SECRET="your_nextauth_secret_here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # File Upload Configuration
   MAX_FILE_SIZE="10485760" # 10MB in bytes
   UPLOAD_DIR="./public/uploads"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Create uploads directory**
   ```bash
   mkdir -p public/uploads
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### POST `/api/classify`
Upload and analyze an animal image.

**Request:**
- `image`: Image file (JPEG, PNG, WebP, max 10MB)
- `farmId`: Farm identifier (optional)
- `farmName`: Farm name (optional)
- `location`: Location (optional)

**Response:**
```json
{
  "success": true,
  "classification": {
    "id": "classification_id",
    "animalType": "cattle",
    "imageUrl": "/uploads/image.jpg",
    "bodyLength": 180.5,
    "heightAtWithers": 145.2,
    "chestWidth": 65.8,
    "rumpAngle": 12.5,
    "bodyCondition": 7,
    "overallScore": 85.5,
    "breedScore": 82.3,
    "conformationScore": 88.1,
    "confidence": 0.92,
    "analysisNotes": "Well-proportioned animal with good conformation...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "analysis": {
    "animalType": "cattle",
    "measurements": { ... },
    "scores": { ... },
    "metadata": { ... },
    "confidence": 0.92,
    "analysisNotes": "..."
  }
}
```

### GET `/api/classifications`
Fetch all classifications with pagination and filtering.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `animalType`: Filter by animal type (cattle/buffalo)
- `farmId`: Filter by farm ID

### GET `/api/classifications/[id]`
Fetch a specific classification by ID.

### DELETE `/api/classifications/[id]`
Delete a classification by ID.

## Database Schema

### AnimalClassification
- `id`: Unique identifier
- `animalType`: "cattle" or "buffalo"
- `imageUrl`: URL to the uploaded image
- `imagePath`: File system path
- `bodyLength`: Body length in cm
- `heightAtWithers`: Height at withers in cm
- `chestWidth`: Chest width in cm
- `rumpAngle`: Rump angle in degrees
- `bodyCondition`: Body condition score (1-9)
- `overallScore`: Overall quality score (0-100)
- `breedScore`: Breed characteristics score (0-100)
- `conformationScore`: Physical conformation score (0-100)
- `breed`: Estimated breed
- `age`: Estimated age in years
- `weight`: Estimated weight in kg
- `gender`: "male" or "female"
- `farmId`: Farm identifier
- `farmName`: Farm name
- `location`: Location
- `confidence`: AI confidence level (0-1)
- `analysisNotes`: Analysis notes
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Farm
- `id`: Unique identifier
- `name`: Farm name
- `location`: Farm location
- `contactInfo`: Contact information
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Usage

1. **Upload Image**: Click the upload area or drag and drop an image of a cattle or buffalo
2. **Enter Farm Information**: Optionally provide farm details for record keeping
3. **Analyze**: Click "Analyze Image" to process with AI
4. **View Results**: Review the AI-generated classification, measurements, and scores
5. **Data Storage**: Results are automatically saved to the database

## AI Analysis Features

The system uses Google Gemini AI to analyze images and provide:

- **Animal Type Classification**: Distinguish between cattle and buffaloes
- **Physical Measurements**: Precise measurements of key body parameters
- **Quality Scoring**: Objective scores for overall quality, breed characteristics, and conformation
- **Metadata Extraction**: Estimated breed, age, weight, and gender
- **Confidence Assessment**: AI confidence level for each analysis
- **Detailed Notes**: Comprehensive analysis notes and observations

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Push schema to database
- `npm run db:studio`: Open Prisma Studio

### Project Structure

```
natures-eye/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
│   ├── gemini.ts         # Gemini AI integration
│   ├── image-utils.ts    # Image processing utilities
│   ├── prisma.ts         # Database client
│   └── utils.ts          # General utilities
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── public/               # Static files
│   └── uploads/          # Uploaded images
└── package.json          # Dependencies and scripts
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret for sessions | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `MAX_FILE_SIZE` | Maximum file upload size in bytes | No (default: 10MB) |
| `UPLOAD_DIR` | Directory for uploaded files | No (default: ./public/uploads) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.
