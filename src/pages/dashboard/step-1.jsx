import Button from '@/components/shared/Button';
import { questions } from '@/data/newUser';
import DashboardLayout from '@/layouts/DashboardLayout';
import { updateUser, updateUserHealth } from '@/lib/user';
import { getUserProfile, selectUser } from '@/store/userSlice';
import { openNotificationWithIcon } from '@/utils/helper';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StepOne = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startRecording, setStartRecording] = useState(false);
  const { push } = useRouter();
  const questionsList = questions;

  const handleNextQuestion = (answer) => {
    // Add user answer to userAnswers
    if (startRecording && currentQuestionIndex <= questionsList.length) {
      let processedAnswer = answer; // Process answer if needed

      // If the current question is about smoking, convert 'Yes' to true and 'No' to false
      if (questionsList?.[currentQuestionIndex - 1]?.name === 'isSmoker') {
        processedAnswer = answer === 'Yes';
      }

      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: questionsList?.[currentQuestionIndex - 1]?.question,
          answer: processedAnswer,
        },
      ]);
    }

    // Increment the current question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // If the user presses "Enter," trigger the next question
      handleNextQuestion(e.target.value);
    }
  };

  useEffect(() => {
    // Start recording when the first custom "Okay" button is pressed
    if (currentQuestionIndex === 1 && !startRecording) {
      setStartRecording(true);
    }

  }, [userAnswers, startRecording, currentQuestionIndex]);

  const updateProfile = async () => {
    setLoading(true);
    const basicInfoValues = {
      firstName: userAnswers[0]?.answer,
      dateOfBirth: userAnswers[2]?.answer,
      gender: userAnswers[1]?.answer,
      hasOnboarded: true
    };

    const healthInfoValues = {
      isSmoker: userAnswers[3]?.answer,
    };

    try {
      const response = await updateUser(user?.id, basicInfoValues);
    } catch (error) {
      openNotificationWithIcon(
        'error',
        'Update user',
        'User profile not updated'
      );
    }

    try {
      const response = await updateUserHealth(healthInfoValues);
      if (response) {
        openNotificationWithIcon(
          'success',
          'Update User',
          'User Profile Updated'
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        'error',
        'Update user',
        'User Profile not updated'
      );
    } finally {
      setLoading(false);
      dispatch(getUserProfile());
      push('/dashboard/symptom-assessment');
    }
  };

  const firstName = userAnswers.find(
    (answer) => answer.question === 'Great, what is your first name?'
  )?.answer;

  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto text-left'>
        <div key={currentQuestionIndex} className=''>
          <div>
            <Image src='/AIavatar.svg' width={50} height={50} alt='AI Avatar' />
            <div className='-mt-[20px] ml-[60px] border border-grey-200 shadow-lg w-[300px] p-4 rounded-lg'>
              {currentQuestionIndex === 0
                ? 'So I am going to ask a few questions that will aid me in helping you'
                : currentQuestionIndex <= questionsList?.length
                ? questionsList?.[currentQuestionIndex - 1]?.question.replace(
                    'Tola',
                    firstName || 'Tola'
                  )
                : `Thank You, ${firstName}. I have enough info for now and can help you find out what’s going on. Just start a symptom assesment`}
            </div>
          </div>
          <div className='flex flex-col items-end mt-7'>
            <div className='p-4 text-sm font-bold text-black rounded-full bg-primary-surface'>
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
                questionsList?.[currentQuestionIndex - 1]?.type === 'radio' ? (
                  questionsList?.[currentQuestionIndex - 1]?.options?.map(
                    (option, index) => (
                      <div key={index}>
                        <Button
                          text={option}
                          outlined
                          clickFunction={() => handleNextQuestion(option)}
                          className={'w-full'}
                        />
                      </div>
                    )
                  )
                ) : questionsList?.[currentQuestionIndex - 1]?.type ===
                  'text' ? (
                  <input
                    type='text'
                    placeholder={
                      questionsList?.[currentQuestionIndex - 1]?.placeholder
                    }
                    onKeyPress={handleKeyPress}
                    className={'w-full p-2 border rounded-md'}
                  />
                ) : questionsList?.[currentQuestionIndex - 1]?.type ===
                  'date' ? (
                  <input
                    type='date'
                    onChange={(e) => handleNextQuestion(e.target.value)}
                    className={'w-full p-2 border rounded-md'}
                  />
                ) : null
              ) : (
                <Button
                  text={'Start symptom assessment'}
                  primary
                  clickFunction={() => updateProfile()}
                  className={'w-full'}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StepOne;
