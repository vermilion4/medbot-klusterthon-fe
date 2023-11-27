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


/**
 * Get Symptoms
 * @param {string} keyword
 * @returns {Promise}
 */
export const getSymptoms = (keyword) => {
  return appAxios.get(`/symptoms?keyword=${keyword}`);
}

/**
 * Get AI Report
 * @param {Object} data
 * @returns {Promise}
 */
export const getAIReport = (data) => {
  return appAxios.post(`/ai/report`, data);
}

/**
 * Get Health assessments
 * @param {string} userId
 * @returns {Promise}
 */
export const getHealthAssessment = (userId) => {
  return appAxios.get(`/health-assessments?userId=${userId}`);
}