import BasicInfo from '@/components/Dashboard/profile/BasicInfo';
import HealthBg from '@/components/Dashboard/profile/HealthBg';
import PersonalInfo from '@/components/Dashboard/profile/PersonalInfo';
import DashboardLayout from '@/layouts/DashboardLayout';
import { selectUser } from '@/store/userSlice';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(selectUser);


  const defaultVals = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-CA') : '',
    bodyHeight: user?.bodyHeight || 0,
    bodyWeight: user?.bodyWeight || 0,
    gender: user?.gender || '',
    hasHighBloodPressure: user?.healthBackground?.hasHighBloodPressure ? 'true' : 'false',
      hasDiabetes: user?.healthBackground?.hasDiabetes ? 'true' : 'false',
      isSmoker: user?.healthBackground?.isSmoker ? 'true' : 'false',
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...defaultVals,
    },
  });
  

  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import('ldrs');
      cardio.register();
    }
    getLoader();
  }, []);

  if (!user) {
    return (
      <div className='min-h-screen grid place-content-center'>
        <l-cardio size='60' stroke='5' speed='1.5' color='#0098DE'></l-cardio>
      </div>
    );
  }
  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto text-left'>
        <h2 className='text-start text-xl mb-8'>My Profile</h2>
        <FormProvider {...methods}>
          <BasicInfo />
          <PersonalInfo />
          <HealthBg />
        </FormProvider>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
