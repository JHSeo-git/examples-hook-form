import { cva } from 'class-variance-authority';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="py-10">
      <h1 className="text-6xl font-bold leading-snug">Form Examples</h1>
      <ul className="mt-4 list-disc pl-6">
        <li>
          <h2 className="text-2xl font-bold">
            <a
              href="https://react-hook-form.com/get-started/"
              className={anchorStyle()}
              target="_blank"
              rel="noreferrer"
            >
              react-hook-form
            </a>
          </h2>
        </li>
        <li>
          <h2 className="text-2xl font-bold">
            <a
              href="https://www.radix-ui.com/docs/primitives/overview/introduction"
              className={anchorStyle()}
              target="_blank"
              rel="noreferrer"
            >
              radix-ui
            </a>
          </h2>
        </li>
        <li>
          <h2 className="text-2xl font-bold">
            <a
              href="https://ui.shadcn.com/docs"
              className={anchorStyle()}
              target="_blank"
              rel="noreferrer"
            >
              shadcn/ui
            </a>
          </h2>
        </li>
        <li>
          <h2 className="text-2xl font-bold">
            <a
              href="https://headlessui.com/"
              className={anchorStyle()}
              target="_blank"
              rel="noreferrer"
            >
              headlessui
            </a>
          </h2>
        </li>
      </ul>
      <div className="mt-4">
        <Link href="/examples" className={buttonVariants()}>
          See Examples
        </Link>
      </div>
    </main>
  );
}

const anchorStyle = cva('text-blue-700 hover:underline dark:text-blue-300');
