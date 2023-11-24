import { Dropdown, Form, Typography } from 'antd';
import Button from '../Button';
import SocialLogin from './SocialLogin';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const { Text } = Typography;

const AuthCard = ({ register, login }) => {
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

  const items = [
    {
      key: '1',
      label: (
        <Link rel='noopener noreferrer' href='/'>
          Terms of Service
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link rel='noopener noreferrer' href='/'>
          Privacy Policy
        </Link>
      ),
    },
  ];

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className=' w-[90vw] max-w-[482px] bg-grey-100 py-8 px-5 md:px-[54px] mx-auto rounded-[20px] text-center'>
      <h2 className='font-bold text-[32px] leading-10 mb-2'>
        {register ? 'Create account' : 'Sign in'}
      </h2>
      <p className='mb-6'>
        {register ? 'Already have an account?' : "Don't have an account?"}
        <span
          className='ml-2 text-sm font-medium leading-6 cursor-pointer underline'
          onClick={() => (register ? push('/login') : push('/register'))}>
          {register ? 'Log in' : 'Create account'}
        </span>
      </p>
      <Form onFinish={onFinish}>
        <Form.Item
          className='text-start'
          name={'email'}
          rules={[{ required: true, message: 'Enter your email address' }]}>
          <input
            type='email'
            placeholder='Email address'
            className='w-full rounded-[10px] py-3 px-4 border focus:border-primary outline-none focus:ring-2'
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
              className='w-full rounded-[10px] py-3 px-4 relative border focus:border-primary outline-none focus:ring-2'
            />
          </Form.Item>
          <p
            className='underline absolute top-[13px] right-4 font-medium text-sm cursor-pointer'
            onClick={() => toggleShowPassword('password')}>
            {showPassword.password ? 'Hide' : 'Show'}
          </p>
        </div>
        {login && (
          <div className='mb-4 text-start'>
            <Link
              href={'/forgot-password'}
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
                className={`w-full rounded-[10px] py-3 px-4 relative border focus:border-primary outline-none focus:ring-2`}
              />
            </Form.Item>
            <p
              className='underline absolute top-[13px] right-4 font-medium text-sm cursor-pointer'
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
      <SocialLogin />

      <Dropdown menu={{ items }} placement='topLeft' arrow>
        <Image
          className='fixed bottom-10 right-5 md:right-20 cursor-pointer hover:scale-105 transition-all ease-in-out'
          src='/question.svg'
          width={44}
          height={44}
          alt='popup question'
        />
      </Dropdown>
    </div>
  );
};

export default AuthCard;
