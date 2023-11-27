import appAxios from "@/utils/http";

/**
 * Update User
 * @param {string} id
 * @param {Object} data
 * @returns {Promise}
 */
export const updateUser = (id,data) => {
  return appAxios.patch(`/users/${id}`,data);
}

/**
 * Update User Health Background
 * @param {Object} data
 * @returns {Promise}
 */
export const updateUserHealth = (data) => {
  return appAxios.patch(`/health-background/`,data);
}