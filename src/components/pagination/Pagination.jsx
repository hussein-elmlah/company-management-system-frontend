import axiosInstance from './config';

export const subscribeSource = (sourceToSubscribe) => {
  return axiosInstance.post('/sources/subscribe', sourceToSubscribe)
    .then(response => response.data)
    .catch(error => {
      console.error('Error subscribing to source:', error);
      throw error;
    });
};

export const unsubscribeSource = (sourceId) => {
  return axiosInstance.post(`/sources/unsubscribe/${sourceId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error unsubscribing from source:', error);
      throw error;
    });
};

export const getTopFiveSources = () => {
  return axiosInstance.get('/sources/topFive')
    .then(response => {
        return response.data;
    })
    .catch(error => {
      console.error('Error fetching top five sources:', error);
      throw error;
    });
};

export const getPaginatedSources = (page = 1, pageSize = 10) => {
  return axiosInstance.get(`/sources?page=${page}&pageSize=${pageSize}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
      console.error('Error fetching paginated sources:', error);
      throw error;
    });
};

export const getSubscribedArticles = (page = 1, pageSize = 10) => {
  return axiosInstance.get(`/articles/subscribed?page=${page}&pageSize=${pageSize}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
      console.error('Error fetching subscribed articles:', error);
      throw error;
    });
};
