'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import title from 'title';

import { cn } from '@/lib/utils';

interface SidebarNavItem {
  title: string;
  href: string;
}

interface SidbarNavProps {
  items: SidebarNavItem[];
}

export function SidbarNav({ items }: SidbarNavProps) {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <ul className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={cn(
              'my-1/2 group flex w-full items-center rounded-md px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800',
              pathname === item.href && 'bg-slate-100 dark:bg-slate-800'
            )}
          >
            {title(item.title)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
