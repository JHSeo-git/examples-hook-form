'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import * as z from 'zod';

import { useToast } from '@/hooks/use-toast';

import { Combobox, ComboboxContent, ComboboxItem, ComboboxTrigger } from '../combobox';
import { HelperText } from '../helper-text';
import { Autocomplete } from '../ui/autocomplete';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const signupSchema = z
  .object({
    email: z
      .string({ required_error: '이메일을 입력해주세요.' })
      .email({ message: '이메일 형식이 아닙니다.' }),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요.',
      })
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    passwordConfirm: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    name: z
      .string({
        required_error: '이름을 입력해주세요.',
      })
      .min(2, { message: '이름은 2자 이상이어야 합니다.' }),
    job: z.string({ required_error: '직업을 선택해주세요.' }),
    sex: z.object(
      { optionLabel: z.string(), optionValue: z.string() },
      { invalid_type_error: '타입이 올바르지 않습니다.', required_error: '성별을 선택해주세요.' }
    ),
    hobby: z.string({ required_error: '취미를 선택해주세요.' }),
    phone: z
      .string({ required_error: '휴대폰 번호를 입력해주세요.' })
      .refine(isMobilePhone, { message: '휴대폰 번호 형식이 아닙니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type SignupSchema = z.infer<typeof signupSchema>;

const sexOptions = [
  {
    optionLabel: '남성',
    optionValue: 'male',
  },
  {
    optionLabel: '여성',
    optionValue: 'female',
  },
  {
    optionLabel: '기타',
    optionValue: 'other',
  },
];

const hobbyhOptions = [
  {
    optionLabel: '영화',
    optionValue: 'movie',
  },
  {
    optionLabel: '음악',
    optionValue: 'music',
  },
  {
    optionLabel: '운동',
    optionValue: 'exercise',
  },
  {
    optionLabel: '여행',
    optionValue: 'travel',
  },
  {
    optionLabel: '게임',
    optionValue: 'game',
  },
];

type FormValues = SignupSchema;

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
        <Label htmlFor="phone">휴대폰 번호</Label>
        <Input id="phone" {...register('phone')} className="my-1" />
        {errors.phone && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.phone.message}
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
                <SelectValue placeholder="직업" />
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
              value={
                sexOptions.find((option) => option.optionValue === field.value?.optionValue) || null
              }
              onChange={(e, value) => field.onChange(value || '')}
              options={sexOptions}
              getListOptionLabel={(option) => option.optionLabel}
              getOptionLabel={(option) => option.optionLabel}
              filterOptions={(options, state) =>
                options.filter(
                  (option) =>
                    option.optionLabel.includes(state.inputValue) ||
                    option.optionValue.includes(state.inputValue)
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
                  <ComboboxItem key={option.optionValue} value={option.optionValue}>
                    {option.optionLabel}
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
