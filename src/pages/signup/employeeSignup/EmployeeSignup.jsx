// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './EmployeeSignup.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import UserService from '../../../axios/user';

const EmployeeSignupComponent = () => {
//   const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      mobileNumber: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('يجب ادخال الاسم الاول'),
      lastName: Yup.string().required('يجب ادخال الاسم الاخير'),
      username: Yup.string().required('يجب ادخال اسم المستخدم'),
      mobileNumber: Yup.string().required('يجب ادخال رقم الهاتف'),
      email: Yup.string().email('يجب ادخال البريد الالكتروني بشكل صحيح').required('يجب ادخال البريد الالكتروني'),
      password: Yup.string().min(8, 'يجب ادخال على الاقل 8 حروف لكلمة السر').required('يجب ادخال كلمة السر'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.type = 'employee';
      UserService.createUser(values)
        .then((response) => {
          console.log(response.headers);
          alert('congratulation, you signed up successfully. Please verify your email.');
          resetForm();
        })
        .catch((error) => {
          console.error('Signup error:', error);
          alert('Signup error - check you data');
        });
    },
  });

  return (
    <div>
      <div className=" rounded-2 con">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstNameInput" className="form-label text">الاسم الاول</label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              {...formik.getFieldProps('firstName')}
              placeholder="ادخل الاسم الاول"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.firstName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="lastNameInput" className="form-label text">الاسم الاخير</label>
            <input
              type="text"
              className="form-control"
              id="lastNameInput"
              {...formik.getFieldProps('lastName')}
              placeholder="ادخل الاسم الاخير"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.lastName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="usernameInput" className="form-label text">اسم المستخدم</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              {...formik.getFieldProps('username')}
              placeholder="ادخل اسم المستخدم"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="form-text text-danger">
                <small>{formik.errors.username}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="mobileNumber" className="form-label text">رقم الهاتف</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              {...formik.getFieldProps('mobileNumber')}
              placeholder="ادخل رقم الهاتف"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className="form-text text-danger">
                <small>{formik.errors.mobileNumber}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="emailInput" className="form-label text">البريد الالكتروني</label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              {...formik.getFieldProps('email')}
              placeholder="ادخل البريد الالكتروني"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="form-text text-danger">
                <small>{formik.errors.email}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label text">كلمة السر</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              {...formik.getFieldProps('password')}
              placeholder="ادخل كلمة السر"
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
            disabled={!formik.isValid || formik.isSubmitting}
          >
            انشئ حساب
          </button>
        </form>
        <p className="text">هل لديك حساب بالفعل ؟ <NavLink to={`/login`} className="text" > تسجيل دخول </NavLink> </p>
      </div>
      {/* <div className="text-center"> */}
      {/* </div> */}
    </div>
  );
};

export default EmployeeSignupComponent;
