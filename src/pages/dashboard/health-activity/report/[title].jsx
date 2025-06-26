import ExpandSearchCauses from "@/components/shared/ExpandSearchCauses";
import { useRouter } from "next/router";

const HealthCause = () => {
  const {query} = useRouter()
  const {title, description} = query
  return ( 
    <ExpandSearchCauses source={''} title={title} description={description} />
   );
}
 
export default HealthCause;