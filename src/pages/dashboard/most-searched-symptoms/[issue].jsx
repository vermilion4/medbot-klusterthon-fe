import Overview from '@/components/Dashboard/Health-activity/Overview';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Breadcrumb, Tabs } from 'antd';
import { useRouter } from 'next/router';

const ExpandSearchCauses = () => {
  const {query, back} = useRouter()
  const {issue} = query
  const tabitems = [
    {
      key: '1',
      label: 'Overview',
      children: <Overview />,
    },
    {
      key: '2',
      label: 'Risks',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Symptoms',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Diagnosis',
      children: 'Content of Tab Pane 4',
    },
    {
      key: '5',
      label: 'Treatment',
      children: 'Content of Tab Pane 5',
    },
    {
      key: '6',
      label: 'Prevention',
      children: 'Content of Tab Pane 6',
    },
  ];
  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto'>
        <Breadcrumb
          separator='>'
          items={[
            {
              title: 'Most Searched Symptoms',
              href: '/dashboard/most-searched-symptoms'
            },
            {
              title: `${issue}`,
            },
          ]}
        />
      <div className='mt-[34px]'>
      <Tabs defaultActiveKey="1" items={tabitems}  />
      </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpandSearchCauses;
