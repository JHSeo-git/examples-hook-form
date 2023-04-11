import '@/styles/shiki.css';

import { ExampleMain } from '@/components/example-main';
import Search from '@/components/examples/search';

import { getMarkup } from '../examples-utils';

async function ExampleSearchPage() {
  const markup = await getMarkup('search.tsx');

  return (
    <ExampleMain title="Search" markup={markup}>
      <Search />
    </ExampleMain>
  );
}

export default ExampleSearchPage;
