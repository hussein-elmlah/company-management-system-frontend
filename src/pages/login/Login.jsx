// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/user.services';
import './Login.css';

const LoginComponent = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('يجب ادخال اسم المستخدم'),
      password: Yup.string().min(8, 'يجب ادخال على الاقل 8 حروف لكلمة السر').required('يجب ادخال كلمة السر'),
    }),
    onSubmit: (values) => {
      UserService.login(values)
        .then((response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.user);
          navigate('/').then(() => {
            window.location.reload();
          });
        })
         .catch((error) => {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
          });
    },
  });

  return (
    <div className="px-3">
      <div className="loginpage rounded-2">
        <form onSubmit={formik.handleSubmit} className="mt-2 p-4">
          <label htmlFor="username" className="mb-2"> اسم المستخدم</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="ادخل اسم المستخدم"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="form-text text-danger">
              <small>{formik.errors.username}</small>
            </div>
          ) : null}

          <label htmlFor="password" className="mb-2">كلمة السر</label>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="ادخل كلمة السر"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="form-text text-danger">
              <small>{formik.errors.password}</small>
            </div>
          ) : null}

          <button
            type="submit"
            className="mb-2 mt-2 rounded-2"
            disabled={!formik.isValid || formik.isSubmitting}
            className={!formik.isValid || formik.isSubmitting ? 'disabled' : ''}
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
      <div className="text-center">
        <p>ليس لديك حساب ؟ <a href="/signup">انشئ حساب</a></p>
      </div>
    </div>
  );
};

export default LoginComponent;
