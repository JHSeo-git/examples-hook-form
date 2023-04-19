'use client';

import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useToast } from '@/components/ui/use-toast';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const searchSchema = z.object({
  q: z.string({ required_error: '검색어를 입력해주세요.' }),
});
type SearchSchema = z.infer<typeof searchSchema>;

type FormValues = SearchSchema;

function Search() {
  const { toast } = useToast();
  const { handleSubmit, register, control, formState } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: '✅ 완료',
      description: JSON.stringify(data, null, 2),
    });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    toast({
      title: '🤔 오류',
      description: Object.entries(errors)
        .map(([key, value]) => `${key}: ${value.message}`)
        .join(', '),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="mx-auto w-[300px] space-y-8">
      <div>
        <Label>검색어</Label>
        <Input {...register('q')} />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          //disabled={!isValid}
        >
          검색
        </Button>
      </div>
    </form>
  );
}

export default Search;
