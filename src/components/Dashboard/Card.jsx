import Image from 'next/image';
import Button from '../shared/Button';

const HealthCard = ({ activity, search, health, symptom, setShowComponent, setSymptom, index }) => {
  const { id, title, recommendation, date, description, severity } = activity || {};
  const handleNavigate = () =>{
    let navTo = null
    switch (navTo)
    {
      case health:
        navTo = `/dashboard/health-activity/${id}`
        break;
      case search:
        navTo = `/dashboard/most-searched-symptoms/${title}`
        break;
      default:
        navTo = `/dashboard/symptom/${id}/${title}`
        break;
    }

    if (symptom) {
      setShowComponent(true)
      setSymptom(title)
    }
    console.log(title)
    console.log(navTo)
    // push(navTo)
  }
  return (
    <div className='px-7 h-[248px] py-5 rounded-xl shadow-lg border border-grey-50 flex flex-col items-start relative'>
      <div className='flex justify-between items-start text-start w-full'>
        <div>
          {
            health && (<div className='flex items-center gap-2 mb-[5.5px]'>
            <Image src='/activity.svg' width={14} height={14} alt='clock' />
            <p className='text-subdued'>{date}</p>
          </div>)
          }
          <h3 className='text-xl font-bold line-clamp-2'>{title}</h3>
          <p className={` ${severity === 'high' ? 'text-critical-100' : severity === 'mid' ? 'text-warning-100' : severity === 'low' ? 'text-success-100' : 'text-secondary'} text-sm mb-1`}>{recommendation}</p>
         
        </div>
        {
          !search && !symptom && ((date || !recommendation) ? <Image src='/trash.svg' width={18} height={18} alt='trash' /> : <div className='text-primary border border-primary rounded-full w-7 h-7 px-[9px] py-[2px]'>{index}</div>)
        }
        
      </div>

      <p className='text-subdued text-sm text-start line-clamp-3'>
        {description}
      </p>

      <Button
        outlined
        text={`${health ? 'View report' : search ? 'View more' : symptom ? 'Select symptom' : 'Tell me more'}`}
        className={'w-[80%] mx-auto !absolute bottom-5 left-0 right-0'}
        clickFunction={handleNavigate}
      />
    </div>
  );
};

export default HealthCard;
