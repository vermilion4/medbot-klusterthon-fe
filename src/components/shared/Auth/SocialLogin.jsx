import { signIn } from 'next-auth/react';
import Image from 'next/image';

const SocialLogin = () => {
  return (
    <>
      <div className='flex w-full items-center gap-3 mb-6'>
        <hr className='border border-grey-200 w-full' />
        <p className='font-bold text-xs'>Or</p>
        <hr className='border border-grey-200 w-full' />
      </div>
      <div className='cursor-pointer hover:bg-grey-200 transition-all duration-300 ease-in-out p-4 flex justify-center relative border border-grey-200 rounded-lg mb-2'
        onClick={()=>{
          signIn('google', { callbackUrl: '/dashboard' })
        }}
        >
        <Image
          className='hidden sm:block absolute top-[19px] left-[19px]'
          src='/google.svg'
          width={20}
          height={20}
          alt='google icon'
        />
        <span className='font-bold'>Continue with Google</span>
      </div>
      <div className='p-4 flex justify-center relative border border-grey-200 rounded-lg mb-2'>
        <Image
          className='hidden sm:block absolute top-[19px] left-[19px]'
          src='/facebook.svg'
          width={20}
          height={20}
          alt='google icon'
        />
        <span className='font-bold'>Continue with Facebook</span>
      </div>
      <div className='p-4 flex justify-center relative border border-grey-200 rounded-lg'>
        <Image
          className='hidden sm:block absolute top-[19px] left-[19px]'
          src='/x.svg'
          width={20}
          height={20}
          alt='google icon'
        />
        <span className='font-bold'>Continue with Twitter</span>
      </div>
    </>
  );
};

export default SocialLogin;
