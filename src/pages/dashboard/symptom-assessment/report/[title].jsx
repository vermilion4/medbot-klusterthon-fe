import ExpandSearchCauses from "@/components/shared/ExpandSearchCauses";
import { useRouter } from "next/router";

const SymptomCause = () => {
  const {query} = useRouter()
  const {title, description} = query
  return ( 
    <ExpandSearchCauses source={'symptom'} title={title} description={description} />
   );
}
 
export default SymptomCause;