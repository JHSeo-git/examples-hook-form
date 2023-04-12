import '@/styles/shiki.css';

import SignUp from '@/components/examples/signup';
import { Preview } from '@/components/preview';

import { getMarkup } from '../examples-utils';

async function ExampleSignUpPage() {
  const markup = await getMarkup('signup.tsx');

  return (
    <Preview title="SignUp" markup={markup}>
      <SignUp />
    </Preview>
  );
}

export default ExampleSignUpPage;
