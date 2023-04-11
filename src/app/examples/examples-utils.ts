import fs from 'node:fs/promises';
import path from 'node:path';

export const CONTENT_DIR = 'src/components/examples';

export const getExamples = async () => {
  const examplesDirectory = path.join(process.cwd(), CONTENT_DIR);
  const filenames = await fs.readdir(examplesDirectory);
  const examples = filenames
    .map((file) => file.replace(/\.(jsx|tsx)$/g, ''))
    .filter((file) => file !== 'components');
  return { examples, filenames };
};
