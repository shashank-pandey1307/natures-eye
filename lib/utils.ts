import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to translate analysis notes content
export function translateAnalysisNotes(notes: string, t: (key: string) => string): string {
  if (!notes) return '';
  
  const lowerNotes = notes.toLowerCase();
  
  // Handle specific known patterns
  if (lowerNotes.includes('mock analysis')) {
    return t('analysisNotes.mock');
  }
  
  if (lowerNotes.includes('analysis failed')) {
    return t('analysisNotes.failed');
  }
  
  // Handle common analysis patterns
  if (lowerNotes.includes('excellent') && (lowerNotes.includes('condition') || lowerNotes.includes('conformation'))) {
    return t('analysisNotes.excellent');
  }
  
  if (lowerNotes.includes('good') && lowerNotes.includes('condition')) {
    return t('analysisNotes.good');
  }
  
  if (lowerNotes.includes('fair') && lowerNotes.includes('condition')) {
    return t('analysisNotes.fair');
  }
  
  if (lowerNotes.includes('poor') && lowerNotes.includes('condition')) {
    return t('analysisNotes.poor');
  }
  
  if (lowerNotes.includes('healthy')) {
    return t('analysisNotes.healthy');
  }
  
  if (lowerNotes.includes('underweight')) {
    return t('analysisNotes.underweight');
  }
  
  if (lowerNotes.includes('overweight')) {
    return t('analysisNotes.overweight');
  }
  
  if (lowerNotes.includes('young') && lowerNotes.includes('growth')) {
    return t('analysisNotes.young');
  }
  
  if (lowerNotes.includes('mature') && lowerNotes.includes('condition')) {
    return t('analysisNotes.mature');
  }
  
  if (lowerNotes.includes('breeding')) {
    return t('analysisNotes.breeding');
  }
  
  if (lowerNotes.includes('production')) {
    return t('analysisNotes.production');
  }
  
  if (lowerNotes.includes('high quality')) {
    return t('analysisNotes.quality');
  }
  
  if (lowerNotes.includes('standard quality')) {
    return t('analysisNotes.standard');
  }
  
  // If no specific pattern matches, return the original notes
  // This handles dynamic AI-generated content that doesn't match our patterns
  return notes;
}