import HealthCard from '@/components/Dashboard/Card';
import Empty from '@/components/Dashboard/Empty';
import { useRecommendation } from '@/context/reportContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getHealthAssessment } from '@/lib/ai';
import { selectUser } from '@/store/userSlice';
import { openNotificationWithIcon } from '@/utils/helper';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HealthActivity = () => {
  const { user } = useSelector(selectUser);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setRecommendationData } = useRecommendation();

  useEffect(() => {
    getAllHealthReports();
  }, []);

  const getAllHealthReports = async () => {
    setLoading(true);
    try {
      const res = await getHealthAssessment(user?.id);
      if (res) {
        setActivity(res.data);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto'>
        <h2 className='mb-1 text-start text-xl'>Health activities</h2>
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {[1, 2]?.map((item) => (
            <Skeleton.Button
              key={item}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
              style={{
                height: '10rem',
                marginTop: '1.8rem',
                borderRadius: '1rem',
                marginRight: '1rem',
              }}
            />
          ))}
          </div>
        ) : activity?.length === 0 ? (
          <div className='flex justify-center'>
          <Empty text='Perform a symptom assessment to see your health activities.' />
          </div>
        ) : (
          <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
            {activity?.map((activity, index) => (
              <HealthCard
                key={index}
                index={index + 1}
                setRecommendationData={setRecommendationData}
                activity={activity}
                navTo={'health'}
                health
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default HealthActivity;
