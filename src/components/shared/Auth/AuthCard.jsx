'use client';
import { Dropdown, Form, Typography } from 'antd';
import Button from '../Button';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { openNotificationWithIcon } from '@/utils/helper';
import _ from 'lodash';
import { registerUser } from '@/lib/auth';

const { Text } = Typography;

const AuthCard = ({ register, login }) => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
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


  useEffect(() => {
    if (!_.isEmpty(session?.user)) {
      localStorage.setItem('token', session?.user?.accessToken);
      push('/dashboard');
    }
  }, [session]);

  const onFinish = async (values) => {
    setLoading(true);
    
    if (login) {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
  
      if (response?.error) {
        setLoading(false);
        openNotificationWithIcon('error', 'Signin', response?.error);
      }
  
      if (response?.ok) {
        setLoading(false);
        openNotificationWithIcon('success', 'Signin', 'Sign in successful');
      }
    } else {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }

      try{
        const response = await registerUser(data)
        if (response) {
          setLoading(false);
          push({
            pathname: '/auth/register/verify-email',
            query: { email: values.email },
          })
        }
      }
      catch(error){
        setLoading(false);
        openNotificationWithIcon('error', 'Signup', error.message);
      }

    }
  };

  return (
    <>
      <h2 className='font-bold text-[32px] leading-10 mb-2'>
        {register ? 'Create account' : 'Sign in'}
      </h2>
      <p className='mb-6'>
        {register ? 'Already have an account?' : "Don't have an account?"}
        <span
          className='ml-2 text-sm font-medium leading-6 cursor-pointer underline'
          onClick={() =>
            register ? push('/auth/login') : push('/auth/register')
          }>
          {register ? 'Log in' : 'Create account'}
        </span>
      </p>
      <Form onFinish={onFinish}>
        {
          register && (
            <>
            <Form.Item
              className='text-start'
              name={'firstName'}
              rules={[{ required: true, message: 'Enter your First name' }]}>
              <input
                type='text'
                placeholder='First name'
                className='w-full rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              />
            </Form.Item>
            <Form.Item
              className='text-start'
              name={'lastName'}
              rules={[{ required: true, message: 'Enter your Last name' }]}>
              <input
                type='text'
                placeholder='Last name'
                className='w-full rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              />
              </Form.Item>
            </>
          )
        }
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
        {login && (
          <div className='mb-4 text-start'>
            <Link
              href={'/auth/forgot-password'}
              className='underline font-medium text-sm'>
              Forgot Password?
            </Link>
          </div>
        )}

        {register && (
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
                      <Text
                        type='danger'
                        className='text-xs !text-critical-100'>
                        The passwords do not match
                      </Text>
                    </div>
                  );
                }

                return null;
              }}
            </Form.Item>
          </div>
        )}

        <Form.Item>
          <Button
            htmlType='submit'
            text={loading && login ? 'Logging in' : 'Continue'}
            primary
            className={'w-full'}
            loading={loading}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AuthCard;
