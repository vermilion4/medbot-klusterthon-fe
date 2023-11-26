import Button from '@/components/shared/Button';
import AuthLayout from '@/layouts/Authlayout';
import { sendVerificationEmail } from '@/lib/auth';
import { openNotificationWithIcon } from '@/utils/helper';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const {query, push} = useRouter()
  const {email, token} = query
  const [loading, setLoading] = useState(false)

  const sendVerification = async () => {
    setLoading(true)
    try {
      const response = await sendVerificationEmail(email)
      if (response){
        openNotificationWithIcon('success', 'Verification', 'Email Verification Link Resent Successfully');
      }
      setLoading(false);
    }
    catch(error){
      setLoading(false);
      openNotificationWithIcon('error', 'Verification', error.message);
      }
  }

  useEffect(()=> {
    if (token){
      openNotificationWithIcon('success', 'Verification', 'Email verification successful!');
      push('/auth/login')
    }
  })

  return (
    <AuthLayout backText={'Go back'}>
      <Image
        className='mx-auto mb-2'
        src='/inbox.svg'
        width={48}
        height={48}
        alt='inbox icon'
      />
      <h2 className='font-bold text-[32px] leading-10 mb-2'>Verify email</h2>
      <p className='mb-8'>
        A link has been sent to your email address for verification. If you did
        not receive any link, click the button below to resend.
      </p>
      <Button
        className={'w-[60%]'}
        primary
        text={'Resend Link'}
        clickFunction={sendVerification}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default VerifyEmail;
