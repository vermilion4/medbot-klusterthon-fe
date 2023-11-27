import { Radio, Space } from 'antd';
import { useState } from 'react';
import { Form, useFormContext } from 'react-hook-form';

const HealthBg = () => {
  const {register} = useFormContext()

  return (
    <div className='mb-12'>
      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-4'>Health Background</h3>
        <hr />
      </div>
      <Form>
      <div className='mb-[29px]'>
          <p className='mb-[6px]'>
            Have you ever been diagnosed with high blood pressure?
          </p>
          <label>
            <div className='flex gap-2'>
              <input
                name='bloodPressure'
                type='radio'
                id='yesBP'
                value='true'
                {...register('hasHighBloodPressure')}
              />
              Yes
            </div>
            <div className='flex gap-2'>
              <input
                name='bloodPressure'
                type='radio'
                id='noBP'
                value='false'
                {...register('hasHighBloodPressure')}
              />
              No
            </div>
          </label>
        </div>
      <div className='mb-[29px]'>
          <p className='mb-[6px]'>
          Do you have diabetes?
          </p>
          <label>
            <div className='flex gap-2'>
              <input
                name='diabetes'
                type='radio'
                id='yesD'
                value='true'
                {...register('hasDiabetes')}
              />
              Yes
            </div>
            <div className='flex gap-2'>
              <input
                name='diabetes'
                type='radio'
                id='noD'
                value='false'
                {...register('hasDiabetes')}
              />
              No
            </div>
          </label>
        </div>
      <div className='mb-[29px]'>
          <p className='mb-[6px]'>
          Are you a smoker?
          </p>
          <label>
            <div className='flex gap-2'>
              <input
                name='smoker'
                type='radio'
                id='yesSmoker'
                value='true'
                {...register('isSmoker')}
              />
              Yes
            </div>
            <div className='flex gap-2'>
              <input
                name='smoker'
                type='radio'
                id='noSmoker'
                value='false'
                {...register('isSmoker')}
              />
              No
            </div>
          </label>
        </div>
      </Form>
    </div>
  );
};

export default HealthBg;
