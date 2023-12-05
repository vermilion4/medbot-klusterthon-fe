import Button from '@/components/shared/Button';
import AuthLayout from '@/layouts/Authlayout';
import { Form, Typography } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/lib/auth';
import { openNotificationWithIcon } from '@/utils/helper';

const { Text } = Typography;

const ResetPassword = () => {
  const {query, push} = useRouter()
  const {token} = query
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleShowPassword = (inputName) => {
    setShowPassword((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  const onFinish = async (values) =>{
    setLoading(true)
    try {
      const data = {
        password: values.password
      }
      const response = resetPassword(data, token)
      if (response) {
        openNotificationWithIcon('success', 'Reset password', 'Password reset successful');
        push('/auth/login')
      }
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      openNotificationWithIcon('error', 'Reset password', error.message)
    }
  }
  return (
    <AuthLayout>
      <h2 className='font-bold text-[32px] leading-10 mb-2'>Change Password</h2>
      <p className='mb-6'>
        Password must be at least 8 characters long and contain a number or
        special character
      </p>
      <Form onFinish={onFinish}>
        <div className='relative'>
          <Form.Item
            className='text-start'
            name={'password'}
            rules={[{ required: true, message: 'Enter your password' }]}>
            <input
              type={`${showPassword.password ? 'text' : 'password'}`}
              placeholder='Password'
              className='w-full rounded-[10px] h-14 pl-4 pr-16 relative border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
            />
          </Form.Item>
          <p
            className='underline absolute top-[18px] right-4 font-medium text-sm cursor-pointer'
            onClick={() => toggleShowPassword('password')}>
            {showPassword.password ? 'Hide' : 'Show'}
          </p>
        </div>
        <div className='relative'>
          <Form.Item
            className='text-start'
            name={'confirmPassword'}
            rules={[{ required: true, message: 'Confirm your password' }]}>
            <input
              type={`${showPassword.confirmPassword ? 'text' : 'password'}`}
              placeholder='Re-enter password'
              className={`w-full rounded-[10px] h-14 pl-4 pr-16 relative border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4`}
            />
          </Form.Item>
          <p
            className='underline absolute top-[18px] right-4 font-medium text-sm cursor-pointer'
            onClick={() => toggleShowPassword('confirmPassword')}>
            {showPassword.confirmPassword ? 'Hide' : 'Show'}
          </p>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              const passwordFieldValue = getFieldValue('password');
              const confirmPasswordFieldValue =
                getFieldValue('confirmPassword');

              if (
                confirmPasswordFieldValue &&
                passwordFieldValue !== confirmPasswordFieldValue
              ) {
                return (
                  <div className='-mt-5 mb-[16px] text-start'>
                    <Text type='danger' className='text-xs !text-critical-100'>
                      The passwords do not match
                    </Text>
                  </div>
                );
              }

              return null;
            }}
          </Form.Item>
        </div>
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

export default ResetPassword;
