import HealthCard from '@/components/Dashboard/Card';
import Button from '@/components/shared/Button';
import { healthActivity } from '@/data/healthActivity';
import DashboardLayout from '@/layouts/DashboardLayout';
import Image from 'next/image';

const HealthActivity = () => {
  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[70%] mx-auto'>
        <h2 className='mb-1 text-start text-xl'>Health activities</h2>
        <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
          {healthActivity?.map((activity) => (
          <HealthCard activity={activity} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthActivity;
