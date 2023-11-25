import SymptomModal from '@/components/Dashboard/Modal';
import Button from '@/components/shared/Button';
import DashboardLayout from '@/layouts/DashboardLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Dashboard = () => {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    push('dashboard/step-1');
  };

  return (
    <DashboardLayout>
      <div className='items-center mx-auto min-h-[90vh] grid place-content-center md:w-1/2 w-[60vw]'>
        <Image
          className='mx-auto mb-10'
          src={'logoIcon.svg'}
          width={91}
          height={67}
          alt='logo'
        />
        <h2 className='text-xl md:text-[28px] font-medium leading-[32px] md:leading-[42px] text-center mb-8'>
          Hello <span className='text-secondary'>Tola</span>👋🏽, Welcome to
          Medbot AI! Discover more about your health with us.
        </h2>
        <Button
          text={'Start symptom assessment'}
          primary
          clickFunction={showModal}
          rightIcon={'/rightArrow.svg'}
          className={'w-fit mx-auto'}
        />
      </div>
      <SymptomModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </DashboardLayout>
  );
};

export default Dashboard;
