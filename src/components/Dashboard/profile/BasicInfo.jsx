import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { Form, Button as AntBtn, Dropdown } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/shared/Button';
import _ from 'lodash';
import { updateUser, updateUserHealth } from '@/lib/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, selectUser } from '@/store/userSlice';
import { openNotificationWithIcon } from '@/utils/helper';

const items = [
  {
    label: 'Male',
    key: 'male',
  },
  {
    label: 'Female',
    key: 'female',
  },
];

const BasicInfo = () => {
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    getValues,
    formState: { isValid, dirtyFields },
    setValue,
  } = useFormContext();

  const { isLargeScreen } = useIsLargeScreen();

  const handleMenuClick = (e) => {
    const options = {
      shouldDirty: true,
    }
    setValue('gender', e.key, options); 
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const dropdownStyle = {
    width: `${!isLargeScreen ? '50%' : '100%'}`,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const handleClick = async () => {
    setLoading(true);
    const dirtyValues = {};
    const allDirtyFields = Object.keys(dirtyFields);

    // Separate the values based on the fields
    allDirtyFields.forEach((field) => {
      dirtyValues[field] = getValues()[field];
    });

    // Separate the values for different endpoints
    const basicInfoValues = {
      firstName: dirtyValues['firstName'],
      lastName: dirtyValues['lastName'],
      dateOfBirth: dirtyValues['dateOfBirth'],
      gender: dirtyValues['gender'],
      bodyWeight: dirtyValues['bodyWeight'],
      bodyHeight: dirtyValues['bodyHeight'],
    };

    const healthInfoValues = {
      hasHighBloodPressure: dirtyValues['hasHighBloodPressure'],
      hasDiabetes: dirtyValues['hasDiabetes'],
      isSmoker: dirtyValues['isSmoker'],
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
        'HUpdate user',
        'User Profile not updated'
      );
    } finally {
      setLoading(false);
      dispatch(getUserProfile());
    }
  };


  return (
    <div className='mb-12'>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='font-bold text-lg'>Basic Information</h3>
          <Button
            primary
            className={'bg-secondary hover:bg-secondary-hover w-[40%]'}
            text={'Save All'}
            htmlType={'submit'}
            disabled={_.isEmpty(dirtyFields) || !isValid}
            clickFunction={handleClick}
            loading={loading}
          />
        </div>
        <hr />
      </div>

      <Form layout={'vertical'}>
        <div className='relative mb-14 md:mb-0'>
          <Form.Item
            className='text-start'
            name={'firstName'}
            label={'First Name'}>
            <input
              type='text'
              placeholder='First Name'
              className='w-full md:w-1/2 rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              {...register('firstName')}
            />
          </Form.Item>
        </div>
        {/* Last name */}
        <div className='relative mb-14 md:mb-0'>
          <Form.Item
            className='text-start'
            name={'lastName'}
            label={'Last Name'}>
            <input
              type='text'
              placeholder='Last Name'
              className='w-full md:w-1/2 rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              {...register('lastName')}
            />
          </Form.Item>
        </div>

        {/* Date of birth */}
        <div className='relative mb-14 md:mb-0'>
          <Form.Item
            className='text-start'
            name={'dateOfBirth'}
            label={'Date of birth'}>
            <input
              type='date'
              placeholder='Date of birth'
              className='w-full md:w-1/2 rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              {...register('dateOfBirth')}
            />
          </Form.Item>
        </div>
        {/* Gender dropdown */}
        <div className='relative mb-14 md:mb-0'>
          <Form.Item className='text-start' name={'gender'} label={'Gender'}>
            <Dropdown menu={menuProps}>
              <AntBtn style={dropdownStyle}>
                {
                  user?.gender ?? 'Gender'
                }
                <Image
                  src={'/dropdownBtn.svg'}
                  width={18}
                  height={18}
                  alt='icon'
                />
              </AntBtn>
            </Dropdown>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default BasicInfo;
