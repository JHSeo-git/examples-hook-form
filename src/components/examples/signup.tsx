'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface FormValues {
  email: string;
  password: string;
  name: string;
  job: string;
  birthdate: string;
  sex: string;
  phone: string;
}

function SignUp() {
  const { handleSubmit, reset, register } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>이메일</Label>
      <Input {...register('name')} />
      <Button type="submit">회원가입</Button>
    </form>
  );
}

export default SignUp;
