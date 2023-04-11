import '@/styles/shiki.css';

import fs from 'node:fs/promises';

import shiki from 'shiki';
import title from 'title';

import CopyToClipboard from '@/components/copy-to-clipboard';

import { CONTENT_DIR, getExamples } from '../examples-utils';

const getTitle = (text: string) => {
  return title(text.replace(/-/g, ' '));
};

type PageParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<PageParams[]> {
  const { examples } = await getExamples();

  return examples.map((example) => ({ slug: example }));
}

interface PageProps {
  params: PageParams;
}
async function ExamplesSlugPage({ params }: PageProps) {
  const { filenames } = await getExamples();
  const template = filenames.filter((example) => {
    const [fileName] = example.split('.');
    return params.slug === fileName;
  });

  const Example = (await import(`../../../components/examples/${params.slug}`)).default;
  const path = `${process.cwd()}/${CONTENT_DIR}/${template[0]}`;
  const reactMarkup = await fs.readFile(path, { encoding: 'utf-8' });
  const highlightedMarkup = await shiki
    .getHighlighter({ theme: 'github-dark' })
    .then((highlighter) => highlighter.codeToHtml(reactMarkup, { lang: 'tsx' }));

  return (
    <main className="relative py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {getTitle(params.slug)}
      </h1>
      <h2 className="mt-12 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight dark:border-b-slate-700">
        Preview
      </h2>
      <div className="my-6 min-h-[350px] overflow-hidden rounded-md border border-slate-200 p-10 dark:border-slate-800">
        <Example />
      </div>
      <h2 className="mt-12 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight dark:border-b-slate-700">
        Code
      </h2>
      <CopyToClipboard className="my-6 rounded-md">
        <div
          {...{ ['data-shiki-pretty-code-fragment']: '' }}
          dangerouslySetInnerHTML={{
            __html: highlightedMarkup,
          }}
        />
      </CopyToClipboard>
    </main>
  );
}

export default ExamplesSlugPage;
