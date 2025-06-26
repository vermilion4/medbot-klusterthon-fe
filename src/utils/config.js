export const config = {
  backendUrl: process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4042/v1/',
  statusCheckInterval: 30000,
  timeouts: {
    statusCheck: 5000,
    wakeUp: 15000
  }
}

export const validateBackendUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:'
  } catch {
    return false
  }
}

export const getBackendUrl = () => {
  const url = config.backendUrl
  
  if (!validateBackendUrl(url)) {
    console.warn('Invalid backend URL configured. Please check your NEXT_PUBLIC_API_URL environment variable.')
    return 'http://localhost:4042'
  }
  
  return url
}