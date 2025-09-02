'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, History } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Nature's Eye</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Classify
              </Button>
            </Link>
            <Link href="/history">
              <Button
                variant={pathname === '/history' ? 'default' : 'ghost'}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
