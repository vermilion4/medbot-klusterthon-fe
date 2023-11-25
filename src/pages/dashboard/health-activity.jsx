import Button from '@/components/shared/Button';
import { healthActivity } from '@/data/healthActivity';
import DashboardLayout from '@/layouts/DashboardLayout';
import Image from 'next/image';

const HealthActivity = () => {
  return (
    <DashboardLayout>
      <div className='w-[70%] mx-auto'>
        <h2 className='mb-6 text-start text-xl'>Health activities</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[14px]'>
          {healthActivity?.map(({ id, issue, sub, date, description }) => (
            <div
              key={id}
              className='px-7 h-[248px] py-5 rounded-xl shadow-lg border border-grey-50 flex flex-col items-start relative'>
              <div className='flex items-center gap-2 mb-[5.5px]'>
                <Image src='/activity.svg' width={14} height={14} alt='clock' />
                <p className='text-subdued'>{date}</p>
              </div>

              <h3 className='text-xl font-bold'>{issue}</h3>
              <p className='text-secondary text-sm mb-1'>{sub}</p>
              <p className='text-subdued text-sm text-start line-clamp-3'>
                {description}
              </p>
              <Button
                outlined
                text='View report'
                className={'w-[90%] mx-auto !absolute bottom-5 left-0 right-0'}
              />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthActivity;
