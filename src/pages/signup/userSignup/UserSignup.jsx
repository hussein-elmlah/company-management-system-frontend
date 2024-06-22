// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './UserSignup.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../../services/user.services';

const UserSignupComponent = () => {
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
      UserService.createUser(values)
        .then((response) => {
          console.log(response.headers);
          alert('congratulation,you signed up successfully.');
          resetForm();
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            console.log('Error message:', error.response.data.message);
          }
          console.error('Signup error:', error);
        });
    },
  });

  return (
    <div>
      <div className="rounded-2 co">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstNameInput" className="form-label textf">الاسم الاول</label>
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
            <label htmlFor="lastNameInput" className="form-label textf">الاسم الاخير</label>
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
            <label htmlFor="usernameInput" className="form-label textf">اسم المستخدم</label>
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
            <label htmlFor="mobileNumber" className="form-label textf">رقم الهاتف</label>
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
            <label htmlFor="emailInput" className="form-label textf">البريد الالكتروني</label>
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
            <label htmlFor="passwordInput" className="form-label textf">كلمة السر</label>
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
            className="mb-2 mt-2 rounded-2 btext"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            انشئ حساب
          </button>
        </form>
      </div>
      <div className="text-center">
        <p className="textf">هل لديك حساب بالفعل ؟ <a className="textf" href="/login">تسجيل دخول</a></p>
      </div>
    </div>
  );
};

export default UserSignupComponent;
