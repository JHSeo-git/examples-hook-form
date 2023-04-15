'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';
import type { Signup } from '@/lib/validations/signup';
import { signupSchema } from '@/lib/validations/signup';

import { Combobox, ComboboxContent, ComboboxItem, ComboboxTrigger } from '../combobox';
import { HelperText } from '../helper-text';
import { Autocomplete } from '../ui/autocomplete';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const sexOptions = [
  {
    name: '남성',
    value: 'male',
  },
  {
    name: '여성',
    value: 'female',
  },
  {
    name: '기타',
    value: 'other',
  },
];

const hobbyhOptions = [
  {
    name: '영화',
    value: 'movie',
  },
  {
    name: '음악',
    value: 'music',
  },
  {
    name: '운동',
    value: 'exercise',
  },
  {
    name: '여행',
    value: 'travel',
  },
  {
    name: '게임',
    value: 'game',
  },
];

type FormValues = Signup;

function SignUp() {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ data });
    toast({
      title: '완료',
      description: JSON.stringify(data, null, 2),
    });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log({ errors });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="mx-auto w-[300px] space-y-8">
      <div>
        <Label htmlFor="email">이메일 주소</Label>
        <Input id="email" {...register('email')} className="my-1" />
        {errors.email && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.email.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" {...register('password')} className="my-1" type="password" />
        {errors.password && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.password.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          id="passwordConfirm"
          {...register('passwordConfirm')}
          className="my-1"
          type="password"
        />
        {errors.passwordConfirm && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.passwordConfirm.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="name">이름</Label>
        <Input id="name" {...register('name')} className="my-1" />
        {errors.name && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.name.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="job">직업</Label>
        <Controller
          name="job"
          control={control}
          render={({ field }) => (
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="job" className="my-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">학생</SelectItem>
                <SelectItem value="teacher">선생님</SelectItem>
                <SelectItem value="developer">개발자</SelectItem>
                <SelectItem value="designer">디자이너</SelectItem>
                <SelectItem value="etc">기타</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.job && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.job.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="sex">성별</Label>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <Autocomplete
              name={field.name}
              value={sexOptions.find((option) => option.value === field.value?.value) || null}
              onChange={(e, value) => field.onChange(value || '')}
              options={sexOptions}
              getListOptionLabel={(option) => option.name}
              getOptionLabel={(option) => option.name}
              filterOptions={(options, state) =>
                options.filter(
                  (option) =>
                    option.value.includes(state.inputValue) ||
                    option.name.includes(state.inputValue)
                )
              }
              placeholder="성별"
              className="my-1"
            />
          )}
        />
        {errors.sex && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.sex.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="hobby">취미</Label>
        <Controller
          name="hobby"
          control={control}
          render={({ field }) => (
            <Combobox
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder="취미"
            >
              <ComboboxTrigger id="hobby" className="my-1">
                {field.value}
              </ComboboxTrigger>
              <ComboboxContent>
                {hobbyhOptions.map((option) => (
                  <ComboboxItem key={option.value} value={option.value}>
                    {option.name}
                  </ComboboxItem>
                ))}
              </ComboboxContent>
            </Combobox>
          )}
        />
        {errors.hobby && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.hobby.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="phone">휴대폰 번호</Label>
        <Input id="phone" {...register('phone')} className="my-1" />
        {errors.phone && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.phone.message}
          </HelperText>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          //disabled={!isValid}
        >
          회원가입
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
