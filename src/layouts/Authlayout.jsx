import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Dropdown} from 'antd';
import Terms from '@/components/shared/Terms';
import Privacy from '@/components/shared/Privacy';
import ServerStatus from '@/components/shared/ServerStatus';

const AuthLayout = ({ children, backText }) => {
  const { push, back } = useRouter();
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  
  const items = [
    {
      key: '1',
      label: (
        <div onClick={()=> setShowTerms(true)}>
          Terms of Service
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={()=> setShowPrivacy(true)}>
          Privacy Policy
        </div>
      ),
    },
  ];

  const handleCancel = () =>{
    setShowTerms(false)
    setShowPrivacy(false)
  }
  return (
    <>
      <ServerStatus />
      <div
        className='min-h-screen'
        style={{ display: 'grid', placeContent: 'center', marginTop: '60px' }}>
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
              className='font-medium text-center cursor-pointer'
              onClick={() => back()}>
              {backText}
            </p>
          </div>
        )}
        <div className='w-[90vw] max-w-[482px] bg-grey-100 rounded-[20px] py-8 md:px-[54px] px-5 mb-5 text-center'>
          {children}
        </div>

        <Dropdown menu={{ items }} placement='topLeft' arrow>
          <Image
            className='fixed transition-all ease-in-out cursor-pointer bottom-20 right-5 hover:scale-105'
            src='/question.svg'
            width={44}
            height={44}
            alt='popup question'
          />
        </Dropdown>

        {
          showTerms && (
            <Terms isModalOpen={showTerms} handleCancel={handleCancel}/>
          )
        }
        {
          showPrivacy && (
            <Privacy isModalOpen={showPrivacy} handleCancel={handleCancel}/>
          )
        }
      </div>
    </>
  );
};

export default AuthLayout;
