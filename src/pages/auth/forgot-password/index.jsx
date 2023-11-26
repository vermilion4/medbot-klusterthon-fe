import Button from '@/components/shared/Button';
import AuthLayout from '@/layouts/Authlayout';
import { forgotPassword } from '@/lib/auth';
import { openNotificationWithIcon } from '@/utils/helper';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const data = {
        email: values.email,
      }
      await forgotPassword(data)
        push('/auth/forgot-password/confirmation');
    }
    catch (error) {
      setLoading(false);
      openNotificationWithIcon('error', 'Forgot password', error.message)
    }

  };
  return (
    <AuthLayout backText={'Go back'}>
      <h2 className='font-bold text-[32px] leading-10 mb-2'>Forgot Password</h2>
      <p className='mb-6'>
        Please enter your email and we’ll send you a link to reset your password
      </p>
      <Form onFinish={onFinish}>
        <Form.Item
          className='text-start'
          name={'email'}
          rules={[{ required: true, message: 'Enter your email address' }]}>
          <input
            type='email'
            placeholder='Email address'
            className='w-full rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            text={loading ? 'Submitting' : 'Continue'}
            primary
            className={'w-full'}
            loading={loading}
          />
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
