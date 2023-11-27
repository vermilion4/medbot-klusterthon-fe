// context/RecommendationContext.js
import { createContext, useContext, useState } from 'react';

const RecommendationContext = createContext();

export const useRecommendation = () => {
  return useContext(RecommendationContext);
};

export const RecommendationProvider = ({ children }) => {
  const [recommendation, setRecommendation] = useState(null);

  const setRecommendationData = (data) => {
    setRecommendation(data);
  };

  return (
    <RecommendationContext.Provider value={{ recommendation, setRecommendationData }}>
      {children}
    </RecommendationContext.Provider>
  );
};
