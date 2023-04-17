import isMobilePhone from 'validator/es/lib/isMobilePhone';
import * as z from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    passwordConfirm: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다.' }),
    job: z.string({ required_error: '직업을 선택해주세요.' }),
    sex: z.object(
      { optionLabel: z.string(), optionValue: z.string() },
      { invalid_type_error: '타입이 올바르지 않습니다.', required_error: '성별을 선택해주세요.' }
    ),
    hobby: z.string({ required_error: '취미를 선택해주세요.' }),
    phone: z.string().refine(isMobilePhone, { message: '휴대폰 번호 형식이 아닙니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type Signup = z.infer<typeof signupSchema>;
