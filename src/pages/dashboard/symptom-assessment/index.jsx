import HealthCard from '@/components/Dashboard/Card';
import AIQuestions from '@/components/Dashboard/symptom-assessment/AIQuestions';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getQuestionsFromAI, sendSymptom } from '@/lib/ai';
import { AutoComplete, Skeleton, Progress, Popconfirm } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SymptomAssessment = () => {
  const {push} = useRouter()
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [symptomList, setSymptomList] = useState([]);
  const [showAIQuestions, setShowAIQuestions] = useState(false);
  const [symptom, setSymptom] = useState('');
  const [percent, setPercent] = useState(0);

  const options = [
    { value: 'headache' },
    { value: 'sinus' },
    { value: 'sore throat' },
    { value: 'fever' },
  ];

  const onSelect = async (value) => {
    setLoading(true);
    setShowAIQuestions(false);
    try {
      const data = {
        symptom: value,
      };
      const response = await sendSymptom(data);
      console.log(response);
      if (response) {
        // openNotificationWithIcon('success', 'Reset password', 'Password reset successful');
        // push('/auth/login')
        setSymptomList(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // openNotificationWithIcon('error', 'Reset password', error.message)
    }
  };

  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import('ldrs');
      cardio.register();
    }
    getLoader();
  }, []);

  useEffect(() => {
    getAIQuestions();
  }, [showAIQuestions]);

  const getAIQuestions = async () => {
    if (symptom) {
      setQuestionsLoading(true);
      try {
        const response = await getQuestionsFromAI(symptom);
        if (response) {
          setQuestionsList(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setQuestionsLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto text-start'>
        {showAIQuestions ? (
          <div className='flex items-center mb-4 gap-6'>
            <h2 className='text-start text-xl'>New assessment</h2>
            <Progress size={50} strokeColor='#FFB319' type='circle' percent={percent} />
          </div>
        ) : (
          <h2 className='mb-4 text-start text-xl'>
            Let&lsquo;s start with the symptom that&lsquo;s troubling you the
            most
          </h2>
        )}
        <div className='flex items-center mb-10 gap-10 lg:gap-[85px]'>
          <AutoComplete
            style={{
              width: '70%',
              height: '52px',
            }}
            onSelect={onSelect}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            placeholder='e.g headache'
            options={options}
          />
          <Popconfirm
            title='Close assessment'
            description={`Are you sure you want to stop the assessment? Your progress will not be saved.`}
            okText='Yes'
            onConfirm={()=> push('/dashboard')}
            placement="left"
            cancelText='Cancel'>
            <div className='flex items-center gap-1 cursor-pointer'>
              <Image src='/cancel.svg' width={24} height={24} alt='cancel' />
              <p className='text-sm w-fit whitespace-nowrap text-critical-100'>
                Cancel assessment
              </p>
            </div>
          </Popconfirm>
        </div>

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
                marginBottom: '1.8rem',
                borderRadius: '1rem',
                marginRight: '1rem',
              }}
            />
          ))
        ) : showAIQuestions ? (
          questionsLoading ? (
            <div className='min-h-[50vh] grid place-content-center'>
              <l-cardio
                size='60'
                stroke='5'
                speed='1.5'
                color='#0098DE'></l-cardio>
            </div>
          ) : (
            <AIQuestions
              symptom={symptom}
              setPercent={setPercent}
              questionsList={questionsList}
            />
          )
        ) : (
          <div className='py-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[14px]'>
            {symptomList?.map((activity, index) => (
              <HealthCard
                key={index}
                activity={activity}
                setShowComponent={setShowAIQuestions}
                setSymptom={setSymptom}
                symptom
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SymptomAssessment;
