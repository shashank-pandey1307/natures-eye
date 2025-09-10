import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card' | 'image' | 'button';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  lines = 1,
  animate = true 
}: SkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 rounded-lg';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    card: 'rounded-2xl',
    image: 'rounded-xl',
    button: 'rounded-lg h-10'
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  const skeletonElement = (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );

  if (!animate) return skeletonElement;

  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          ...style,
          background: 'linear-gradient(90deg, rgba(71, 85, 105, 0.3) 25%, rgba(71, 85, 105, 0.6) 50%, rgba(71, 85, 105, 0.3) 75%)',
          backgroundSize: '200% 100%',
        }}
      />
    </motion.div>
  );
}

// Specialized skeleton components
export function SkeletonCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/90 via-emerald-900/80 to-slate-800/90 backdrop-blur-2xl border-emerald-500/30 shadow-2xl shadow-emerald-600/20 rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/50 via-teal-900/40 to-emerald-900/50 p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <Skeleton variant="text" width="60%" height="1.5rem" />
            <Skeleton variant="text" width="40%" height="1rem" />
            <div className="flex gap-2">
              <Skeleton variant="rectangular" width="60px" height="24px" />
              <Skeleton variant="rectangular" width="80px" height="24px" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton variant="circular" width="32px" height="32px" />
            <Skeleton variant="circular" width="32px" height="32px" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Image */}
        <Skeleton variant="image" width="100%" height="200px" />
        
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton variant="card" width="100%" height="80px" />
          <Skeleton variant="card" width="100%" height="80px" />
        </div>
        
        {/* Measurements */}
        <Skeleton variant="card" width="100%" height="120px" />
        
        {/* Additional Info */}
        <Skeleton variant="card" width="100%" height="100px" />
      </div>
    </motion.div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '75%' : '100%'}
          height="1rem"
        />
      ))}
    </div>
  );
}

export function SkeletonButton({ width = '120px' }: { width?: string }) {
  return <Skeleton variant="button" width={width} height="40px" />;
}

export function SkeletonImage({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <Skeleton 
      variant="image" 
      width="100%" 
      height="200px"
      className="aspect-video"
    />
  );
}

// Loading states for specific components
export function ClassificationSkeleton() {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function FilterSkeleton() {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-slate-800/90 via-emerald-900/80 to-slate-800/90 backdrop-blur-2xl border-emerald-500/30 shadow-2xl shadow-emerald-600/20 rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-900/50 via-teal-900/40 to-emerald-900/50 p-6">
          <Skeleton variant="text" width="120px" height="1.5rem" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton variant="text" width="80px" height="1rem" />
                <Skeleton variant="rectangular" width="100%" height="48px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NavigationSkeleton() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 border-b border-emerald-500/30 shadow-lg shadow-emerald-600/20 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width="32px" height="32px" />
            <Skeleton variant="text" width="120px" height="1.5rem" />
          </div>
          <div className="hidden md:flex items-center gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="button" width="100px" height="36px" />
            ))}
          </div>
          <div className="md:hidden">
            <Skeleton variant="circular" width="32px" height="32px" />
          </div>
        </div>
      </div>
    </div>
  );
}
