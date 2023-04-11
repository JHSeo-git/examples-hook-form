'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface FormValues {
  dates: string;
}

function Search() {
  const { handleSubmit, reset, register } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>검색어</Label>
      <Input {...register('dates')} />
      <Button type="submit">검색</Button>
    </form>
  );
}

export default Search;
