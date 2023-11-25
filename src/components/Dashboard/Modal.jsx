import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const SymptomModal = ({ isModalOpen, handleCancel }) => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      closeIcon={null}
      footer={null}
      className={`${isLargeScreen ? 'ml-[139px]': 'ml-[15px]'}`}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 w-[80%]'>
          <Image src={'/info.svg'} width={36} height={36} alt='info' />
          <div>
            <h2 className='mb-1 text-sm font-semibold'>Info</h2>
            <p className='text-subdued text-sm'>
              This assessment will be used to create your profile informations
            </p>
          </div>
        </div>
        <Image className='cursor-pointer' src={'/close.svg'} width={24} height={24} alt='close' onClick={()=> handleCancel()}/>
      </div>
    </Modal>
  );
};

export default SymptomModal;
