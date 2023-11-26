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

/**
 * Get profile
 * @returns {Promise}
 */
export const getProfile = () => {
    return appAxios.get('/users/me');
}

/**
 * Register
 * @param {Object} data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.email
 * @param {string} data.password
 * @returns {Promise}
 */
export const registerUser = (data) => {
    return appAxios.post('/auth/register', data);
}

/**
 * send Verification Email
 * @param {string} email
 * @returns {*}
 */
export const sendVerificationEmail = (email) => {
    return appAxios.post(`/auth/send-verification-email?email=${email}`);
}


/**
 * Forgot password
 * @param {object} data
 * @param {string} data.email
 * @returns {Promise}
 */
export const forgotPassword = (data) => {
    return appAxios.post('/auth/forgot-password', data);
}

/**
 * Reset password
 * @param {object} data
 * @param {string} data.password
 * @param {string} token
 * @returns {Promise}
 */
export const resetPassword = (data, token) => {
    return appAxios.post(`/auth/reset-password?token=${token}`, data);
}