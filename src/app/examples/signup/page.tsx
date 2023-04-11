import '@/styles/shiki.css';

import { ExampleMain } from '@/components/example-main';
import SignUp from '@/components/examples/signup';

import { getMarkup } from '../examples-utils';

async function ExampleSignUpPage() {
  const markup = await getMarkup('signup.tsx');

  return (
    <ExampleMain title="SignUp" markup={markup}>
      <SignUp />
    </ExampleMain>
  );
}

export default ExampleSignUpPage;
