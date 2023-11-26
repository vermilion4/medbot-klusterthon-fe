import appAxios from "@/utils/http";


/**
 * Login
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 * @returns {Promise}
 */
export const login = (data) => {
    return appAxios.post('/auth/login', data);
}