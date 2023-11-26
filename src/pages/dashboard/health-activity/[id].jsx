import HealthCard from '@/components/Dashboard/Card';
import { possibleCause } from '@/data/healthActivity';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button, Dropdown, Space } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

const HealthReport = () => {
  const { query } = useRouter();
  const { id } = query;

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const items = [
    {
      label: 'Share Report',
      key: '1',
      icon: <Image src={'/symptom.svg'} width={18} height={18} alt='icon' />,
    },
    {
      label: 'Delete Report',
      key: '2',
      icon: <Image src={'/symptom.svg'} width={18} height={18} alt='icon' />,
    },
    {
      label: 'Download Report',
      key: '3',
      icon: <Image src={'/symptom.svg'} width={18} height={18} alt='icon' />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[70%] mx-auto text-start'>
        <div className='flex items-center gap-2 mb-[5.5px]'>
          <Image src='/activity.svg' width={14} height={14} alt='clock' />
          <p className='text-subdued'>24 Nov 2023, 21:44</p>
        </div>
        <div className='flex justify-between items-end mb-4'>
          <div>
            <h3 className='text-xl font-bold'>Headache Report</h3>
            <p>Tola, Male</p>
          </div>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Action
                <Image
                  src={'/dropdownBtn.svg'}
                  width={18}
                  height={18}
                  alt='icon'
                />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <hr />
        <div className='mt-3 text-subdued mb-[30px]'>
        <h3 className='font-medium'>Summary</h3>
        <p>People with symptoms similar to yours may require prompt medical assessment and care. You should seek advice from a doctor within the next few hours</p>
        </div>
        <h3 className='text-subdued font-medium mb-4'>Possible Causes</h3>
        <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
          {possibleCause?.map((cause) => (
          <HealthCard activity={cause} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthReport;
