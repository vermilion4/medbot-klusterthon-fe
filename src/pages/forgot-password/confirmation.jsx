import Button from "@/components/shared/Button";
import AuthLayout from "@/layouts/Authlayout";
import Image from "next/image";

const CheckInbox = () => {
  return ( 
    <AuthLayout backText={'Back to Login'}>
      <Image className="mx-auto mb-2" src='/inbox.svg' width={48} height={48} alt="inbox icon" />
        <h2 className='font-bold text-[32px] leading-10 mb-2'>
      Check Your Inbox.
      </h2>
      <p className='mb-8'>
      We have sent a link to reset your password. If you did not receive any link, click the button below to resend.
      </p>
      <Button routeTo='/register' className={ 'w-[40%]' } primary text={ 'Resend Link' } />
    </AuthLayout>
   );
}
 
export default CheckInbox;