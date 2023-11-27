import Button from '@/components/shared/Button';
import { useRecommendation } from '@/context/reportContext';
import { getAIRecommendation } from '@/lib/ai';
import { selectUser } from '@/store/userSlice';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AIQuestions = ({ symptom, questionsList, setPercent }) => {
  const { user } = useSelector(selectUser);
  const { setRecommendationData } = useRecommendation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false)
  const {push} = useRouter()

  const handleNextQuestion = (answer) => {
      // Add user answer to userAnswers
      if (currentQuestionIndex < questionsList.length) {
        setUserAnswers((prevAnswers) => [
          ...prevAnswers,
          { question: questionsList?.[currentQuestionIndex]?.question, answer },
        ]);
      }

    // Increment the current question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    const percentage = Math.round((userAnswers.length / questionsList.length) * 100);
    setPercent(percentage);
  };

  const onQuestionsAnswered = async () => {
    setLoading(true)
    try {
      const data = {
        symptom,
        questions: userAnswers,
      };
      const response = await getAIRecommendation(data);
      if (response) {
        setRecommendationData(response.data);
        push('/dashboard/symptom-assessment/report')
      }
     
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }

  };

  return (
    <>
      <div className=''>
        <div key={currentQuestionIndex} className=''>
          <div>
            <Image src='/AIavatar.svg' width={50} height={50} alt='AI Avatar' />
            <div className='-mt-[20px] ml-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
              {currentQuestionIndex === 0 && questionsList?.length > 0
                ? 'So I am going to ask a few questions that will aid me in helping you'
                : currentQuestionIndex <= questionsList?.length
                ? questionsList?.[currentQuestionIndex - 1]?.question
                : "Don’t forget that this is not a medical diagnosis. If in doubt, it is always best to seek advice from a medical professional."}
            </div>
          </div>
          <div className='mt-7 flex items-end flex-col'>
            <div className='p-4 rounded-full bg-primary-surface text-black text-sm font-bold'>
              <p className='uppercase'>{`${user?.firstName?.charAt(
                0
              )}${user?.lastName?.charAt(0)}`}</p>
            </div>
            <div className='-mt-[20px] mr-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg flex flex-col gap-2'>
              {currentQuestionIndex === 0 ? (
                <Button
                  text={'Okay'}
                  outlined
                  clickFunction={() => handleNextQuestion('okay')}
                  className={'w-full'}
                />
              ) : currentQuestionIndex <= questionsList?.length ? (
                questionsList?.[currentQuestionIndex - 1]?.options?.map((option, index) => (
                  <div key={index}>
                    <Button
                      text={option}
                      outlined
                      clickFunction={() => handleNextQuestion(option)}
                      className={'w-full'}
                    />
                  </div>
                ))
              ) : (
                <Button
                  text={'Open Report'}
                  primary
                  clickFunction={() => onQuestionsAnswered()}
                  className={'w-full'}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIQuestions;
