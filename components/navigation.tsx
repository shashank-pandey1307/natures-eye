'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, History, Leaf, Camera, Upload, LogOut, User, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { useState } from 'react';
import { LogoutPopup } from './logout-popup';
import { buttonVariants, iconVariants, slideInVariants, fadeInVariants, quickTransitions } from '@/lib/transitions';

export function Navigation() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 border-b border-emerald-500/30 shadow-lg shadow-emerald-600/20 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
              variants={iconVariants}
              whileHover="hover"
              transition={quickTransitions.spring}
            >
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </motion.div>
            <motion.span 
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hidden sm:block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t('welcome.title')}
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-emerald-300/30 border-t-emerald-300 rounded-full animate-spin"></div>
                <span className="text-emerald-200 text-sm">Loading...</span>
              </div>
            ) : user ? (
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
                      {t('nav.classify')}
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
                      {t('nav.history')}
                    </Button>
                  </motion.div>
                </Link>
                
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-300" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'bn')}
                    className="bg-emerald-900/60 border border-emerald-500/40 rounded-lg px-2 py-1 text-emerald-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="bn">বাংলা</option>
                  </select>
                </div>
                
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
                      className="text-emerald-200 hover:text-white hover:bg-red-600/30 border-red-500/40 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('nav.logout')}
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
                
                {/* Language Switcher for non-logged-in users */}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-300" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'bn')}
                    className="bg-emerald-900/60 border border-emerald-500/40 rounded-lg px-2 py-1 text-emerald-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="bn">বাংলা</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Switcher for Mobile */}
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-emerald-300" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'bn')}
                className="bg-emerald-900/60 border border-emerald-500/40 rounded px-1 py-1 text-emerald-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
              >
                <option value="en">EN</option>
                <option value="hi">हि</option>
                <option value="bn">বাং</option>
              </select>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-200 hover:text-white hover:bg-emerald-600/30"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl"
            >
            <div className="px-4 py-4 space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="w-4 h-4 border-2 border-emerald-300/30 border-t-emerald-300 rounded-full animate-spin"></div>
                  <span className="text-emerald-200 text-sm">Loading...</span>
                </div>
              ) : user ? (
                <>
                  <Link href="/classify" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname.startsWith('/classify') ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        pathname.startsWith('/classify')
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {t('nav.classify')}
                    </Button>
                  </Link>
                  <Link href="/history" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === '/history' ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        pathname === '/history' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <History className="h-4 w-4 mr-2" />
                      {t('nav.history')}
                    </Button>
                  </Link>
                  
                  <div className="pt-3 border-t border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-200 mb-3">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Button
                      onClick={() => {
                        setShowLogoutConfirm(true);
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-emerald-200 hover:text-white hover:bg-red-600/30 border-red-500/40"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === '/' ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        pathname === '/' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Welcome
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === '/login' ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        pathname === '/login'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0' 
                          : 'text-emerald-200 hover:text-white hover:bg-emerald-600/30 border-emerald-500/40'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
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
