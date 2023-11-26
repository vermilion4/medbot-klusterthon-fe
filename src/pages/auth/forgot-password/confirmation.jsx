import AuthLayout from "@/layouts/Authlayout";
import Image from "next/image";

const CheckInbox = () => {
  return ( 
    <AuthLayout backText={'Go back'}>
      <Image className="mx-auto mb-2" src='/inbox.svg' width={48} height={48} alt="inbox icon" />
        <h2 className='font-bold text-[32px] leading-10 mb-2'>
      Check Your Inbox.
      </h2>
      <p className='mb-8'>
      If your email exists in our system, you will receive an email shortly with instructions on how to reset your password. Please check your inbox, including your spam or junk folder.
      </p>
    </AuthLayout>
   );
}
 
export default CheckInbox;