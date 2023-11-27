import Button from '@/components/shared/Button';
import DashboardLayout from '@/layouts/DashboardLayout';
import { selectUser } from '@/store/userSlice';
import Image from 'next/image';
import { useSelector } from 'react-redux';



const StepOne = () => {
  const { user } = useSelector(selectUser)
  return (
    <DashboardLayout>
      <div className='w-[70%] text-sm mx-auto min-h-[100vh] relative'>
        <div className='h-[58vh] overflow-hidden'>
          <div className=''>
            <div>
              <Image
                src='/AIavatar.svg'
                width={50}
                height={50}
                alt='AI Avatar'
              />
              <div className='-mt-[20px] ml-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
                So I am going to ask a few questions that well aid me in helping
                you
              </div>
            </div>
            <div className='mt-7 flex items-end flex-col'>
              <div className='p-4 rounded-full bg-primary-surface text-black text-sm font-bold'>
              <p className='uppercase'>{`${user?.firstName?.charAt(
                  0
                )}${user?.lastName?.charAt(0)}`}</p>
              </div>
              <div className='-mt-[20px] mr-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
                <Button text={'okay'} outlined className={'w-full'} />
              </div>
            </div>
          </div>
          <div>
            <div className='mt-7'>
              <Image
                src='/AIavatar.svg'
                width={50}
                height={50}
                alt='AI Avatar'
              />
              <div className='-mt-[20px] ml-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
                So I am going to ask a few questions that well aid me in helping
                you
              </div>
            </div>
            <div className='mt-7 flex items-end flex-col'>
              <div className='p-4 rounded-full bg-primary-surface text-black text-sm font-bold'>
              <p className='uppercase'>{`${user?.firstName?.charAt(
                  0
                )}${user?.lastName?.charAt(0)}`}</p>
              </div>
              <div className='-mt-[20px] mr-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
                <Button text={'okay'} outlined className={'w-full'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StepOne;
