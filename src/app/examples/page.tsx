import { notFound, redirect } from 'next/navigation';

import { getExamples } from './examples-utils';

async function ExamplesIndexPage() {
  const { examples } = await getExamples();

  if (!examples?.length) {
    notFound();
  }

  redirect(`/examples/${examples[0]}`);
}

export default ExamplesIndexPage;
