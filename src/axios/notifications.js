import axiosInstance from "./config";

/*  create dummy project

  *  {
  *    "client": {
  *        "user": "65b84e2b0579b171776d0aec",
  *        "fullName": "ali ali",
  *        "mobileNumber": "888-999-0000"
  *    },
  *    "name": "abdo test",
  *    "number": 12,
  *    "description": "This is a test project."
  *  }
  
*/

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
    },
    // {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("Token")}`,
    //   },
    // }
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
