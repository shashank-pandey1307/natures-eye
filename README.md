# Nature's Eye - AI-Powered Livestock Classification System

A comprehensive AI-powered livestock classification system that can distinguish between cattle and buffaloes, with both image upload and live camera feed capabilities.

## Features

### 🏠 Welcome Page
- Beautiful animated welcome interface
- Feature overview with icons
- Get Started button to navigate to classification options

### 🔍 Classification Options
- **Image Upload**: Comprehensive analysis with detailed results
- **Live Camera Feed**: Real-time classification between cattle and buffaloes

### 📸 Image Upload Mode
- Upload livestock images for detailed analysis
- Comprehensive results including:
  - Animal type and breed identification
  - Body measurements and quality scores
  - Age, gender, and conformation analysis
  - AI confidence levels
- Farm information tracking
- Historical data storage

### 📹 Live Camera Mode
- Real-time camera feed
- Instant classification between:
  - **Cattle** (with emerald theme)
  - **Buffalo** (with cyan theme)
  - **Human** (with orange theme for safety)
- Live capture and analysis
- Confidence scoring
- Safety features with human detection

## Technical Features

- **AI-Powered Analysis**: Uses Google Gemini AI for accurate classification
- **Real-time Processing**: Live camera feed with instant results
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Animated backgrounds and smooth transitions
- **Database Integration**: Prisma ORM with PostgreSQL
- **Image Processing**: Sharp library for image optimization

## Pages Structure

```
/
├── / (Welcome Page)
├── /classify (Classification Options)
│   ├── /upload (Image Upload & Analysis)
│   └── /live (Live Camera Feed)
└── /history (Analysis History)
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env.local
   # Add your Google Gemini API key and database URL
   ```

3. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:3000`

## Usage

### Welcome Page
- Click "Get Started" to proceed to classification options

### Image Upload
1. Navigate to `/classify/upload`
2. Upload a livestock image
3. Fill in farm information (optional)
4. Click "Analyze Image" for comprehensive results

### Live Camera
1. Navigate to `/classify/live`
2. Click "Start Camera" to begin live feed
3. Position livestock in view
4. Click "Capture & Analyze" for instant results
5. View real-time classification between cattle and buffaloes

## API Endpoints

- `POST /api/classify` - Main classification endpoint
- Supports both image upload and live camera modes
- Returns detailed analysis results

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini AI
- **Database**: PostgreSQL with Prisma ORM
- **Image Processing**: Sharp, Multer
- **Icons**: Lucide React

## Background Theme

All pages maintain the same beautiful nature-inspired background with:
- Animated particles and floating elements
- Teal to emerald gradient theme
- Smooth animations and transitions
- Consistent visual experience across all pages

## Safety Features

- Human detection in live camera mode
- Camera permission handling
- Error handling and user feedback
- Secure image processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
