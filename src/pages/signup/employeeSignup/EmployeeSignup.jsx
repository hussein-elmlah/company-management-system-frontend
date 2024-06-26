// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import "./EmployeeSignup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import UserService from "../../../axios/user";
import { useTranslation } from 'react-i18next'; 

const EmployeeSignupComponent = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      mobileNumber: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t("firstNameRequired")),
      lastName: Yup.string().required(t("lastNameRequired")),
      username: Yup.string().required(t("usernameRequired")),
      mobileNumber: Yup.string().required(t("mobileNumberRequired")),
      email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
      password: Yup.string()
        .min(8, t("passwordMinLength"))
        .required(t("passwordRequired")),
    }),
    onSubmit: (values, { resetForm }) => {
      values.type = "employee";
      UserService.createUser(values)
        .then((response) => {
          console.log(response.headers);
          alert(t("signupSuccess"));
          resetForm();
        })
        .catch((error) => {
          console.error("Signup error:", error);
          alert(t("signupError"));
        });
    },
  });

  return (
    <div>
      <div className="rounded-2 con">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstNameInput" className="form-label text">
              {t("firstNameLabel")}
            </label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              {...formik.getFieldProps("firstName")}
              placeholder={t("firstNamePlaceholder")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.firstName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="lastNameInput" className="form-label text">
              {t("lastNameLabel")}
            </label>
            <input
              type="text"
              className="form-control"
              id="lastNameInput"
              {...formik.getFieldProps("lastName")}
              placeholder={t("lastNamePlaceholder")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.lastName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="usernameInput" className="form-label text">
              {t("usernameLabel")}
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              {...formik.getFieldProps("username")}
              placeholder={t("usernamePlaceholder")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="form-text text-danger">
                <small>{formik.errors.username}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="mobileNumber" className="form-label text">
              {t("mobileNumberLabel")}
            </label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              {...formik.getFieldProps("mobileNumber")}
              placeholder={t("mobileNumberPlaceholder")}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className="form-text text-danger">
                <small>{formik.errors.mobileNumber}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="emailInput" className="form-label text">
              {t("emailLabel")}
            </label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              {...formik.getFieldProps("email")}
              placeholder={t("emailPlaceholder")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="form-text text-danger">
                <small>{formik.errors.email}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label text">
              {t("passwordLabel")}
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              {...formik.getFieldProps("password")}
              placeholder={t("passwordPlaceholder")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="form-text text-danger">
                <small>{formik.errors.password}</small>
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="mb-2 mt-2 rounded-2 butext"
            disabled={!formik.isValid}
          >
            {t("createAccountButton")}
          </button>
        </form>
        <div className="text-center">
        <p className="textf">{t('haveAccountMessage')} <a className="textf" href="/login">{t('loginLink')}</a></p>
      </div>
      </div>
    </div>
  );
};

export default EmployeeSignupComponent;
