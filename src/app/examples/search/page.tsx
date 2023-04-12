import '@/styles/shiki.css';

import Search from '@/components/examples/search';
import { Preview } from '@/components/preview';

import { getMarkup } from '../examples-utils';

async function ExampleSearchPage() {
  const markup = await getMarkup('search.tsx');

  return (
    <Preview title="Search" markup={markup}>
      <Search />
    </Preview>
  );
}

export default ExampleSearchPage;
