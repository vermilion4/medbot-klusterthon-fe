import Diagnosis from '@/components/Dashboard/Diagnosis';
import Overview from '@/components/Dashboard/Overview';
import Prevention from '@/components/Dashboard/Prevention';
import Risks from '@/components/Dashboard/Risks';
import Symptoms from '@/components/Dashboard/Symptoms';
import Treatment from '@/components/Dashboard/Treatment';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getAIReport } from '@/lib/ai';
import { openNotificationWithIcon } from '@/utils/helper';
import { Breadcrumb, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ExpandSearchCauses = () => {
  const {query, back} = useRouter()
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState({})
  const {title, description} = query

  useEffect(() => {
    async function getLoader() {
      const { cardio } = await import('ldrs');
      cardio.register();
    }
    getLoader();
  }, []);

  useEffect( ()=>{
    
    const getReport = async() => {
      setLoading(true)
      try {
        const data = {
          symptom: title,
          description
        }
        const res = await getAIReport(data)
        if (res) {
          setReport(res.data)
        }
      }
      catch(error){
       openNotificationWithIcon('error', 'Error', 'Something went wrong')
      }
      finally{
        setLoading(false)
      }
    }
 
    getReport()
  }, [])
  
  const hasOverviewData = report?.overview && report?.overview.length > 0 // Check if there's data for Overview
  const hasRisksData = report?.risks && report?.risks.length > 0; // Check if there's data for Risks
  const hasSymptomsData = report?.symptoms && report?.symptoms.length > 0;
  const hasTreatmentsData = report?.treatment && report?.treatment.length > 0;
  const hasPreventionsData = report?.prevention && report?.prevention.length > 0;
  const hasDiagnosisData = report?.diagnosis && report?.diagnosis.length > 0

  const tabitems = [
    {
      key: '1',
      label: 'Overview',
      children: <Overview report={report?.overview} />,
    },
    {
      key: '2',
      label: 'Risks',
      children: <Risks report={report?.risks} />,
    },
    {
      key: '3',
      label: 'Symptoms',
      children: <Symptoms report={report?.symptoms} />,
    },
    {
      key: '4',
      label: 'Diagnosis',
      children: <Diagnosis report={report?.diagnosis} />,
    },
    {
      key: '5',
      label: 'Treatment',
      children: <Treatment report={report?.treatment} />,
    },
    {
      key: '6',
      label: 'Prevention',
      children: <Prevention report={report?.prevention} />,
    },
  ].filter((tab) => {
    // Check if there is data for the tab in the report object
    switch (tab.label.toLowerCase()) {
      case 'overview':
        return hasOverviewData;
      case 'risks':
        return hasRisksData;
      case 'symptoms':
        return hasSymptomsData;
      case 'diagnosis':
        return hasDiagnosisData;
      case 'treatment':
        return hasTreatmentsData;
      case 'prevention':
        return hasPreventionsData;
      default:
        return true;
    }
  });

  if (loading) {
    return <div className='min-h-screen grid place-content-center'>
    <l-cardio
      size='60'
      stroke='5'
      speed='1.5'
      color='#0098DE'></l-cardio>
  </div>
  }

  return (
    <DashboardLayout>
      <div className='w-[75vw] px-5 overflow-x-hidden lg:w-[85%] mx-auto'>
        <Breadcrumb
          separator='>'
          items={[
            {
              title: 'Dashboard',
              href: '/dashboard'
            },
            {
              title: 'Symptom Assessment',
              href: '/dashboard/symptom-assessment'
            },
            {
              title: `${title}`,
            },
          ]}
        />
      <div className='mt-[34px]'>
      <Tabs defaultActiveKey="1" items={tabitems}  />
      </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpandSearchCauses;
