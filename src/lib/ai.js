import appAxios from "@/utils/http";

/**
 * Send symptom
 * @param {string} data.symptom
 * @param {Object} data
 * @returns {Promise}
 */
export const sendSymptom = (data) => {
  return appAxios.post(`/ai/send-symptom`,data);
}


/**
 * Send symptom
 * @param {string} symptom
 * @returns {Promise}
 */
export const getQuestionsFromAI = (symptom) => {
  return appAxios.get(`/ai/questions?symptom=${symptom}`);
}


/**
 * Get AI Recommendation
 * @param {Object} data
 * @returns {Promise}
 */
export const getAIRecommendation = (data) => {
  return appAxios.post(`/ai/recommendations`, data);
}