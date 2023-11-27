import HealthCard from '@/components/Dashboard/Card';
import Report from '@/components/Dashboard/Report';
import Button from '@/components/shared/Button';
import { useRecommendation } from '@/context/reportContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import { selectUser } from '@/store/userSlice';
import { formattedDate } from '@/utils/helper';
import { Button as AntdDBtn, Dropdown, Space } from 'antd';
import moment from 'moment'
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const AssessmentReport = () => {
  const { recommendation } = useRecommendation();
  const {user} = useSelector(selectUser)
  const {push} = useRouter()
  const { summary, symptom, symptoms, causes} = recommendation
  const componentRef = useRef(null);

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MedBot AI Medical Report-${moment().format("L")}`,
    onAfterPrint: () => {
    
    },
  });

  const items = [
    {
      label: 'Share Report',
      key: '1',
      icon: <Image src={'/share.svg'} width={18} height={18} alt='icon' />,
    },
    {
      label: 'Delete Report',
      key: '2',
      icon: <Image src={'/delete.svg'} width={18} height={18} alt='icon' />,
    },
    {
      label: 'Download Report',
      key: '3',
      icon: <Image src={'/download.svg'} width={18} height={18} alt='icon' />,
      onClick: handlePrint,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const style = {
    height: '52px'
  }

  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto text-start'>
        <div className='flex items-center gap-2 mb-[5.5px]'>
          <Image src='/activity.svg' width={14} height={14} alt='clock' />
          <p className='text-subdued'>{formattedDate(Date.now())}</p>
        </div>
        <div className='flex justify-between items-end mb-4'>
          <div>
            <h3 className='text-xl font-bold'>{symptom} Report</h3>
            <p>{user?.firstName}{user?.gender ? <>,{' '}<span>{user?.gender}</span></> : ''}</p>
          </div>
          <div className='flex gap-4'>
          <Dropdown menu={menuProps}>
            <AntdDBtn style={style}>
              <Space>
                Action
                <Image
                  src={'/dropdownBtn.svg'}
                  width={18}
                  height={18}
                  alt='icon'
                />
              </Space>
            </AntdDBtn>
          </Dropdown>
          <Button text={'Continue'} primary rightIcon={'/arrowRightWhite.svg'} clickFunction={()=> push('/dashboard')} />
          </div>
         
        </div>
        <hr />
        <div className='mt-3 text-subdued mb-[30px]'>
        <h3 className='font-medium'>Summary</h3>
        <p>{summary}</p>
        </div>
        <h3 className='text-subdued font-medium mb-4'>Possible Causes</h3>
        <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
          {causes?.map((cause, index) => (
          <HealthCard key={index} activity={cause} index={index + 1} />
          ))}
        </div>
        <h3 className='text-subdued font-medium mb-4 mt-[30px]'>Symptoms</h3>
        <div className='flex flex-col gap-3'>
          {
            symptoms.map((symptom, index)=> (
              <div key={index} className='flex items-center gap-[6px] text-sm'>
                <Image src={'/arrowRight.svg'} width={14} height={14} alt='arrow' />
                {symptom}
              </div>
            ))
          }
        </div>
      </div>
      <Report data={recommendation} componentRef={componentRef} />
    </DashboardLayout>
  );
};

export default AssessmentReport;
