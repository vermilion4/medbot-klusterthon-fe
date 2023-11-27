import HealthCard from '@/components/Dashboard/Card';
import { useRecommendation } from '@/context/reportContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getSymptoms } from '@/lib/ai';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';

const searchActivity = () => {

  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setRecommendationData } = useRecommendation();

  useEffect(() => {
    getSymptomsHistory();
  }, []);

  const getSymptomsHistory = async () => {
    setLoading(true);
    try {
      const res = await getSymptoms();
      if (res) {
        console.log(res)
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
        <h2 className='mb-1 text-start text-xl'>Most Searched Symptoms</h2>
        {loading ? (
          [1, 2]?.map((item) => (
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
          ))
        ) : (
          <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
          {activity?.map((activity, index) => (
          <HealthCard key={index} activity={activity} setRecommendationData={setRecommendationData} search/>
          ))}
        </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default searchActivity;
