import Image from 'next/image';
import Button from '../shared/Button';
import { useRouter } from 'next/router';
import { formattedDate } from '@/utils/helper';

const HealthCard = ({ activity,navTo, search, health, symptom, setShowComponent, setSymptom, index, setRecommendationData }) => {
  const {push} = useRouter()
  const { title, recommendation, keyword, createdAt, description,summary, severity } = activity || {};
  const handleNavigate = () =>{
    switch (navTo)
    {
      case 'health':
        navTo = `/dashboard/health-activity/report`
        break;
      default:
        navTo = {
          pathname: `/dashboard/symptom-assessment/report/${title}`,
          query: {description}
        }
        break;
    }

    if (symptom) {
      setShowComponent(true)
      setSymptom(title)
      return
    }
    if (health) {
      setRecommendationData(activity)
    }
    push(navTo)
    // push(navTo)
  }
  return (
    <div className='px-7 h-[248px] py-5 rounded-xl shadow-lg border border-grey-50 flex flex-col items-start relative'>
      <div className='flex justify-between items-start text-start w-full'>
        <div className='w-[80%]'>
          {
            health && (<div className='flex items-center gap-2 mb-[5.5px]'>
            <Image src='/activity.svg' width={14} height={14} alt='clock' />
            <p className='text-subdued'>{formattedDate(createdAt)}</p>
          </div>)
          }
          <h3 className='text-xl font-bold line-clamp-2'>{title}</h3>
          <p className={`line-clamp-1 text-sm mb-1`}>{recommendation || keyword}</p>
         
        </div>
        <div className='text-primary border border-primary rounded-full w-7 h-7 px-[9px] py-[2px]'>{index}</div> 
      </div>

      <p className='text-subdued text-sm text-start line-clamp-3'>
        {description || summary}
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
