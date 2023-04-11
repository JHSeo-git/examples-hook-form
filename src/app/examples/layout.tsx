import { SidbarNav } from '@/components/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

import { getExamples } from './examples-utils';

async function ExamplesLayout({ children }: { children: React.ReactNode }) {
  const { examples } = await getExamples();
  const items = examples.map((example) => ({
    title: example,
    href: `/examples/${example}`,
  }));

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6">
      <aside className="fixed top-20 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
        <ScrollArea className="py-6 pr-6">
          <h4 className="mb-1 px-2 py-1 font-semibold">Examples</h4>
          <SidbarNav items={items} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}

export default ExamplesLayout;
