import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const AuthLayout = ({ children, backText }) => {
  const { push, back } = useRouter();
  return (
    <div
      className='min-h-screen'
      style={{ display: 'grid', placeContent: 'center' }}>
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
      {backText && (
        <div
          className='flex items-center justify-center gap-[10px]'
          style={{ marginBottom: '32px', marginTop: '70px' }}>
          <Image src='/backArrow.svg' width={24} height={24} alt='back arrow' />
          <p
            className='text-center font-medium cursor-pointer'
            onClick={() => back()}>
            {backText}
          </p>
        </div>
      )}
      <div className='auth-layout'>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
