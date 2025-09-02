'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, History, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navigation() {
  const pathname = usePathname();

  return (
         <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-b border-blue-500/30 shadow-lg shadow-blue-600/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              whileHover={{ rotate: 5 }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Nature's Eye
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={pathname === '/' ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 ${
                    pathname === '/' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-600/30 border-blue-500/40'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Classify
                </Button>
              </motion.div>
            </Link>
            <Link href="/history">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={pathname === '/history' ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 ${
                    pathname === '/history' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-600/30 border-blue-500/40'
                  }`}
                >
                  <History className="h-4 w-4" />
                  History
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
