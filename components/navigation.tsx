'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, History, Leaf, Camera, Upload, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import { LogoutPopup } from './logout-popup';

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 border-b border-emerald-500/30 shadow-lg shadow-emerald-600/20 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
              whileHover={{ rotate: 8 }}
            >
              <Leaf className="h-5 w-5 text-white" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Nature's Eye
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/classify">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={pathname.startsWith('/classify') ? 'default' : 'ghost'}
                      className={`flex items-center gap-2 ${
                        pathname.startsWith('/classify')
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <Camera className="h-4 w-4" />
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
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <History className="h-4 w-4" />
                      History
                    </Button>
                  </motion.div>
                </Link>
                
                {/* User Info and Logout */}
                <div className="flex items-center gap-3 pl-4 border-l border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-200">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setShowLogoutConfirm(true)}
                      variant="ghost"
                      className="text-emerald-200 hover:text-white hover:bg-red-600/30 border-red-500/40"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={pathname === '/' ? 'default' : 'ghost'}
                      className={`flex items-center gap-2 ${
                        pathname === '/' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      Welcome
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={pathname === '/login' ? 'default' : 'ghost'}
                      className={`flex items-center gap-2 ${
                        pathname === '/login'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Logout Popup */}
      <LogoutPopup
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
