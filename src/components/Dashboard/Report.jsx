import { possibleCause, symptoms } from '@/data/healthActivity';

const Report = ({ componentRef }) => {
  return (
    <div
      className='px-10 py-[47px] overflow-x-hidden mx-auto text-start'
      ref={componentRef}
      id='print-only'>
      <p className='text-subdued absolute top-5 right-2'>
        Date created: 24 Nov 2023, 21:44
      </p>
      <div className='flex flex-col justify-center items-center space-y-4 mb-4 mx-auto'>
        <img src={'/dashboardLogo.svg'} alt='logo' className='mx-auto w-[370px]' />
        <div className='text-center'>
          <h3 className='text-xl font-bold'>Headache Report</h3>
          <p>Tola, Male</p>
        </div>
      </div>
      <hr />
      <div className='mt-3 text-subdued mb-[30px]'>
        <h3 className='font-medium'>Summary</h3>
        <p>
          People with symptoms similar to yours may require prompt medical
          assessment and care. You should seek advice from a doctor within the
          next few hours
        </p>
      </div>
      <h3 className='text-subdued font-medium mb-4'>Possible Causes</h3>
      <div className='space-y-4'>
        {possibleCause?.map(({ id, issue, sub, severity, description }) => (
          <div key={id} className='flex items-start gap-[6px]'>
            <img src={'/arrowRight.svg'} className='w-[14px] h-[14px]' alt='arrow' />
            <div>
              <h3 className='text-sm'>{issue}</h3>
              <p
                className={` ${
                  severity === 'high'
                    ? 'text-critical-100'
                    : severity === 'mid'
                    ? 'text-warning-100'
                    : severity === 'low'
                    ? 'text-success-100'
                    : 'text-secondary'
                } text-[10px] mb-1`}>
                {sub}
              </p>
              <p className='text-xs'>{description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className='text-subdued font-medium mb-4 mt-[30px]'>Symptoms</h3>
      <div className='flex flex-col gap-3'>
        {symptoms.map((symptom, index) => (
          <div key={index} className='flex items-center gap-[6px] text-sm'>
            <img src={'/arrowRight.svg'} className='w-[14px] h-[14px]' alt='arrow' />
            {symptom}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
