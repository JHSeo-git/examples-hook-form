import fs from 'node:fs/promises';
import path from 'node:path';

import shiki from 'shiki';

export const CONTENT_DIR = 'src/components/examples';

export const getExamples = async () => {
  const examplesDirectory = path.join(process.cwd(), CONTENT_DIR);
  const filenames = await fs.readdir(examplesDirectory);
  const examples = filenames
    .map((file) => file.replace(/\.(jsx|tsx)$/g, ''))
    .filter((file) => file !== 'components');
  return { examples, filenames };
};

export const getMarkup = async (filename: string) => {
  const path = `${process.cwd()}/${CONTENT_DIR}/${stripUrlSlash(filename)}`;
  const reactMarkup = await fs.readFile(path, { encoding: 'utf-8' });
  const markup = await shiki
    .getHighlighter({ theme: 'github-dark' })
    .then((highlighter) => highlighter.codeToHtml(reactMarkup, { lang: 'tsx' }));

  return markup;
};

const stripUrlSlash = (url: string) => url.replace(/^\/|\/$/g, '');
