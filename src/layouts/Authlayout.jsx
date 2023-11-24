import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const AuthLayout = ({ children }) => {
  const { push } = useRouter();
  return (
    <main className='min-h-screen grid place-content-center overflow-x-hidden'>
      <div className='flex justify-center mb-7'>
        <Image
          src='/logo.svg'
          alt='Logo'
          width={150}
          height={150}
          quality={100}
          priority
          className='cursor-pointer'
          onClick={() => push('/')}
        />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
