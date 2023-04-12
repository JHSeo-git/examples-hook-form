import isMobilePhone from 'validator/es/lib/isMobilePhone';
import * as z from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    passwordConfirm: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다.' }),
    job: z.string().optional(),
    birthdate: z.string().datetime({ message: '생년월일 형식이 아닙니다.' }),
    sex: z.enum(['male', 'female', 'other'], {
      invalid_type_error: '성별 형식이 아닙니다.',
      required_error: '성별을 선택해주세요.',
    }),
    phone: z.string().refine(isMobilePhone, { message: '휴대폰 번호 형식이 아닙니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type Signup = z.infer<typeof signupSchema>;
