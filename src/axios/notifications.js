import axiosInstance from "./config";

export const getMyNotifications = () => {
  return axiosInstance.get(
    "/project-notification/user/6676b8039dec5a7d4fd7ad90",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const readAllNotifications = () => {
  return axiosInstance.put(
    "/project-notification/user/markasread/6676b8039dec5a7d4fd7ad90",
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