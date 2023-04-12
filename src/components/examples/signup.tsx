'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';
import type { Signup } from '@/lib/validations/signup';
import { signupSchema } from '@/lib/validations/signup';

import { HelperText } from '../helper-text';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type FormValues = Signup;

function SignUp() {
  const { toast } = useToast();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    toast({
      content: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[300px] space-y-8">
      <div>
        <Label htmlFor="email">이메일 주소</Label>
        <Input id="email" {...register('email')} className="my-1" />
        {errors.email && (
          <HelperText className="absolute ml-1" status="error">
            {errors.email.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" {...register('password')} className="my-1" type="password" />
        {errors.password && (
          <HelperText className="absolute ml-1" status="error">
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
          <HelperText className="absolute ml-1" status="error">
            {errors.passwordConfirm.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="name">이름</Label>
        <Input id="name" {...register('name')} className="my-1" />
        {errors.name && (
          <HelperText className="absolute ml-1" status="error">
            {errors.name.message}
          </HelperText>
        )}
      </div>
      <div>
        <Label htmlFor="job">직업</Label>
        <Select {...register('job')}>
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
        {errors.job && (
          <HelperText className="absolute ml-1 mt-1" status="error">
            {errors.job.message}
          </HelperText>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={!isValid}>
          회원가입
        </Button>
      </div>
    </form>
  );
}

// birthdate
// sex
// phone

export default SignUp;
