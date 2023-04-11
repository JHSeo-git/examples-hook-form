import Link from 'next/link';

import { Icons } from './icons';

export function MainNav() {
  return (
    <div className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">UI</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/examples">Examples</Link>
      </nav>
    </div>
  );
}
