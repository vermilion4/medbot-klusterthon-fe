import { Form } from 'antd';
import { useFormContext } from 'react-hook-form';

const PersonalInfo = () => {
  const {register} = useFormContext();
  return (
    <div className='mb-12'>
      <div className='mb-6'>
        <h3 className='font-bold text-lg mb-4'>Personal Information</h3>
        <hr />
      </div>
      <Form layout={'vertical'}>
        <div className='flex w-full gap-[29px]'>
          <div className='basis-1/2'>

          <Form.Item
            className='text-start'
            name={'bodyHeight'}
            label={'Body Height (cm)'}>
            <input
              type='text'
              placeholder='cm'
              className='w-full rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              {...register('bodyHeight', { valueAsNumber: true })}
            />
          </Form.Item>
                      
          </div>
          <div className='basis-1/2'>
          <Form.Item
            className='text-start'
            name={'bodyWeight'}
            label={'Body Weight (kg)'}>
            <input
              type='text'
              placeholder='kg'
              className='w-full rounded-[10px] h-14 px-4 border-2 focus:border-primary outline-none ring-primary-surface focus:ring-4'
              {...register('bodyWeight', { valueAsNumber: true })}
            />
          </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInfo;
