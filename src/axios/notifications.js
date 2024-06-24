import axiosInstance from "./config";

export const getMyNotifications = (userId) => {
  return axiosInstance.get(
    `/project-notification/user/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const readAllNotifications = (userId) => {
  return axiosInstance.put(
    `/project-notification/user/markasread/${userId}`,
    {
      isRead: true
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};