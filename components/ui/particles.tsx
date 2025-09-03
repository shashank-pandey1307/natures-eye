'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 25 + 20,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 1.5}px`,
            height: `${particle.size * 1.5}px`,
            opacity: particle.opacity * 3,
          }}
          animate={{
            y: [0, -100, -200, -300, -400],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [particle.opacity * 3, particle.opacity * 4, particle.opacity * 3, particle.opacity * 2, 0],
            scale: [1, 1.4, 1, 0.8, 0],
          }}
          transition={{
            duration: particle.duration * 0.7,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large floating orbs - more nature-inspired colors */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-600/45 to-teal-500/45 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-700/45 to-teal-600/45 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-500/35 to-teal-500/35 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      {/* Medium orbs */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-emerald-400/40 to-transparent rounded-full blur-2xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-teal-400/40 to-transparent rounded-full blur-2xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Small orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-teal-400/35 to-emerald-400/35 rounded-full blur-xl"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-emerald-400/35 to-teal-400/35 rounded-full blur-xl"
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

export function EnergyWaves() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Energy wave rings - nature-inspired colors */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] border-2 border-emerald-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 2, 2.5],
          opacity: [0.5, 0.4, 0.3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] border-2 border-teal-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 2, 2.5],
          opacity: [0.5, 0.4, 0.3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] border-2 border-emerald-400/40 rounded-full"
        animate={{
          scale: [1, 1.5, 2, 2.5],
          opacity: [0.5, 0.4, 0.3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
    </div>
  );
}

export function NatureElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, -60, -90, -120],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
            rotate: [0, 45, 90, 135, 180],
            opacity: [0.25, 0.3, 0.25, 0.2, 0],
            scale: [1, 1.1, 1, 0.9, 0.8],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75 4.19L14 3.5a1 1 0 0 0-.5 0L9.25 4.19A1 1 0 0 0 9 5.19V19a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5.19a1 1 0 0 0-.25-1z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Floating water droplets */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute text-teal-400/55"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, -40, -60, -80],
            x: [0, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5],
            opacity: [0.3, 0.4, 0.3, 0.2, 0],
            scale: [1, 1.2, 1, 0.8, 0.6],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Subtle grass-like elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`grass-${i}`}
          className="absolute text-emerald-500/40"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20}%`,
          }}
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// New animated components
export function FloatingClouds() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large fluffy clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute text-white/20"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 30 + 5}%`,
          }}
          animate={{
            x: [0, 100, 200, 300, 400],
            opacity: [0.2, 0.3, 0.2, 0.1, 0],
            scale: [1, 1.1, 1, 0.9, 0.8],
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        >
          <svg width="80" height="40" viewBox="0 0 100 50" fill="currentColor">
            <path d="M25,35 C15,35 10,30 10,25 C10,20 15,15 25,15 C30,15 35,10 40,10 C45,10 50,15 55,15 C65,15 70,20 70,25 C70,30 65,35 55,35 Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Medium clouds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`medium-cloud-${i}`}
          className="absolute text-white/15"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 40 + 10}%`,
          }}
          animate={{
            x: [0, 80, 160, 240, 320],
            opacity: [0.15, 0.25, 0.15, 0.1, 0],
            scale: [1, 1.05, 1, 0.95, 0.9],
          }}
          transition={{
            duration: Math.random() * 15 + 25,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8,
          }}
        >
          <svg width="60" height="30" viewBox="0 0 80 40" fill="currentColor">
            <path d="M20,25 C12,25 8,22 8,18 C8,14 12,11 20,11 C24,11 28,8 32,8 C36,8 40,11 44,11 C52,11 56,14 56,18 C56,22 52,25 44,25 Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Small clouds */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`small-cloud-${i}`}
          className="absolute text-white/10"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 50 + 15}%`,
          }}
          animate={{
            x: [0, 60, 120, 180, 240],
            opacity: [0.1, 0.2, 0.1, 0.05, 0],
            scale: [1, 1.02, 1, 0.98, 0.95],
          }}
          transition={{
            duration: Math.random() * 12 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 6,
          }}
        >
          <svg width="40" height="20" viewBox="0 0 50 25" fill="currentColor">
            <path d="M15,18 C9,18 6,15 6,12 C6,9 9,6 15,6 C18,6 21,4 24,4 C27,4 30,6 33,6 C39,6 42,9 42,12 C42,15 39,18 33,18 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function FlyingBirds() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Flying birds in V formation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bird-${i}`}
          className="absolute text-emerald-300/65"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 40 + 20}%`,
          }}
          animate={{
            x: [0, 100, 200, 300, 400],
            y: [0, -5, 0, 5, 0],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.4, 0.5, 0.4, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <svg width="32" height="20" viewBox="0 0 24 16" fill="currentColor">
            <path d="M2,8 L8,4 L14,8 L20,4 L22,8 L20,12 L14,8 L8,12 L2,8 Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Single flying birds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`single-bird-${i}`}
          className="absolute text-teal-300/60"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 60 + 10}%`,
          }}
          animate={{
            x: [0, 80, 160, 240, 320],
            y: [0, -8, 0, 8, 0],
            rotate: [0, 8, 0, -8, 0],
            opacity: [0.35, 0.45, 0.35, 0.25, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 18,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          <svg width="26" height="18" viewBox="0 0 20 14" fill="currentColor">
            <path d="M1,7 L6,3 L10,7 L14,3 L16,7 L14,11 L10,7 L6,11 L1,7 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function Butterflies() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fluttering butterflies */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute text-cyan-300/55"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -15, -30, -15, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            rotate: [0, 15, 0, -15, 0],
            scale: [1, 1.1, 1, 0.9, 1],
            opacity: [0.3, 0.4, 0.3, 0.2, 0.3],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8,2 C6,2 4,4 4,6 C4,8 6,10 8,10 C10,10 12,8 12,6 C12,4 10,2 8,2 Z M8,4 C9,4 10,5 10,6 C10,7 9,8 8,8 C7,8 6,7 6,6 C6,5 7,4 8,4 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function SunRays() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sun rays effect */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 text-yellow-300/50"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 128 128" fill="currentColor">
          <path d="M64,0 L68,20 L64,40 L60,20 Z M64,88 L68,108 L64,128 L60,108 Z M0,64 L20,68 L40,64 L20,60 Z M88,64 L108,68 L128,64 L108,60 Z M20,20 L30,30 L40,20 L30,10 Z M88,20 L98,30 L108,20 L98,10 Z M20,88 L30,98 L40,88 L30,78 Z M88,88 L98,98 L108,88 L98,78 Z"/>
        </svg>
      </motion.div>
    </div>
  );
}

export function FloatingFlowers() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating flower petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute text-teal-500/65"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, -40, -60, -80],
            x: [0, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5],
            rotate: [0, 60, 120, 180, 240],
            scale: [1, 1.2, 1, 0.8, 0.6],
            opacity: [0.25, 0.3, 0.25, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10,2 C12,2 14,4 14,6 C14,8 12,10 10,10 C8,10 6,8 6,6 C6,4 8,2 10,2 Z M10,4 C9,4 8,5 8,6 C8,7 9,8 10,8 C11,8 12,7 12,6 C12,5 11,4 10,4 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// New animated background elements
export function FloatingLeaves() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating autumn-style leaves */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-emerald-400/45"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, -60, -90, -120, -150],
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, Math.random() * 30 - 15, Math.random() * 30 - 15, Math.random() * 30 - 15],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            scale: [1, 1.1, 1, 0.9, 0.8, 0.7],
            opacity: [0.25, 0.3, 0.25, 0.2, 0.15, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 4,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75 4.19L14 3.5a1 1 0 0 0-.5 0L9.25 4.19A1 1 0 0 0 9 5.19V19a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5.19a1 1 0 0 0-.25-1z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function RainDrops() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gentle rain drops */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`raindrop-${i}`}
          className="absolute text-cyan-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 100, 200, 300, 400],
            x: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
            opacity: [0, 0.2, 0.2, 0.1, 0],
            scale: [1, 1, 1, 0.8, 0.6],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
            <path d="M4 0L6 8H2L4 0Z M4 8L2 12H6L4 8Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function Fireflies() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Glowing fireflies */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute text-yellow-300/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, -40, -20, 0],
            x: [0, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, 0],
            scale: [1, 1.2, 1, 0.8, 1],
            opacity: [0.4, 0.6, 0.4, 0.2, 0.4],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="6" cy="6" r="3"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating soap bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute text-cyan-300/35"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, -50, -75, -100],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
            scale: [1, 1.1, 1, 0.9, 0.7],
            opacity: [0.15, 0.2, 0.15, 0.1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" fill="none"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function EnhancedClouds() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large fluffy clouds with more variety */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`enhanced-cloud-${i}`}
          className="absolute text-white/40"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 25 + 5}%`,
          }}
          animate={{
            x: [0, 100, 200, 300, 400],
            opacity: [0.25, 0.35, 0.25, 0.15, 0],
            scale: [1, 1.15, 1, 0.9, 0.8],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: Math.random() * 18 + 25,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15,
          }}
        >
          <svg width="100" height="50" viewBox="0 0 100 50" fill="currentColor">
            <path d="M25,35 C15,35 10,30 10,25 C10,20 15,15 25,15 C30,15 35,10 40,10 C45,10 50,15 55,15 C65,15 70,20 70,25 C70,30 65,35 55,35 Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Medium clouds with different shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`medium-enhanced-cloud-${i}`}
          className="absolute text-white/35"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 35 + 15}%`,
          }}
          animate={{
            x: [0, 80, 160, 240, 320],
            opacity: [0.3, 0.4, 0.3, 0.2, 0],
            scale: [1, 1.08, 1, 0.95, 0.9],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 6,
          }}
        >
          <svg width="70" height="35" viewBox="0 0 80 40" fill="currentColor">
            <path d="M20,25 C12,25 8,22 8,18 C8,14 12,11 20,11 C24,11 28,8 32,8 C36,8 40,11 44,11 C52,11 56,14 56,18 C56,22 52,25 44,25 Z"/>
          </svg>
        </motion.div>
      ))}
      
      {/* Small wispy clouds */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`wispy-cloud-${i}`}
          className="absolute text-white/30"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 45 + 20}%`,
          }}
          animate={{
            x: [0, 60, 120, 180, 240],
            opacity: [0.25, 0.35, 0.25, 0.15, 0],
            scale: [1, 1.05, 1, 0.98, 0.95],
            rotate: [0, 0.5, 0, -0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 18,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 4,
          }}
        >
          <svg width="50" height="25" viewBox="0 0 50 25" fill="currentColor">
            <path d="M15,18 C9,18 6,15 6,12 C6,9 9,6 15,6 C18,6 21,4 24,4 C27,4 30,6 33,6 C39,6 42,9 42,12 C42,15 39,18 33,18 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingFeathers() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating feathers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`feather-${i}`}
          className="absolute text-emerald-300/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, -50, -75, -100],
            x: [0, Math.random() * 25 - 12.5, Math.random() * 25 - 12.5, Math.random() * 25 - 12.5, Math.random() * 25 - 12.5],
            rotate: [0, 30, 60, 90, 120],
            scale: [1, 1.1, 1, 0.9, 0.7],
            opacity: [0.2, 0.25, 0.2, 0.15, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2.5,
          }}
        >
          <svg width="28" height="16" viewBox="0 0 28 16" fill="currentColor">
            <path d="M2,8 L8,4 L14,8 L20,4 L22,8 L20,12 L14,8 L8,12 L2,8 Z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingSeeds() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating dandelion seeds */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={`seed-${i}`}
          className="absolute text-cyan-300/45"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, -60, -90, -120],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
            rotate: [0, 45, 90, 135, 180],
            scale: [1, 1.2, 1, 0.8, 0.6],
            opacity: [0.25, 0.3, 0.25, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 16,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 7,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="2"/>
            <path d="M8,2 L8,6 M8,10 L8,14 M2,8 L6,8 M10,8 L14,8"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
