import axiosInstance from "./config";

export const createDummyProject = () => {
  return axiosInstance.post(
    "/projects/",
    {
        "client": {
            "user": "65b84e2b0579b171776d0aec",
            "fullName": "alik",
            "mobileNumber": "888-999-0000"
        },
        "name": "abdo opooooooooooooooooooooo",
        "number": 12,
        "description": "T project."
    }
  );
};

export const subscribeNotification = (subscription) => {
  return axiosInstance.post(
    "/subscribe/", JSON.stringify(subscription),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const sendRealNotifications = () => {
  return axiosInstance.post( "/sendNotification/" )
};


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