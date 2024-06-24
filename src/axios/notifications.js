import axiosInstance from "./config";

// localStorage.getItem('token')
// const decodedToken = jwt.verify(localStorage.getItem('token'), process.env.JWT_SECRET);
// console.log(decodedToken);

export const getMyNotifications = () => {
  return axiosInstance.get(
    // `/project-notification/user/${decodedToken.id}`,
    `/project-notification/user/6676b8039dec5a7d4fd7ad90`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};