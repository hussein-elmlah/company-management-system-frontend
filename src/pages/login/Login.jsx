import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../axios/user';
import './Login.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if(!!localStorage.getItem("token"))   return <Navigate to="/" replace />;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
      password: Yup.string().min(8, t('passwordMinLength')).required(t('passwordRequired')),
    }),
    onSubmit: (values) => {
      UserService.login(values)
        .then((response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.data.user);
          navigate('/');
        })
        .catch((error) => {
          console.error('Login error:', error);
          alert(t('loginFailed') + (error.response?.data?.message || error.message));
        });
    },
  });

  return (
    <div className="px-3">
      <div className="loginpage rounded-2">
        <form onSubmit={formik.handleSubmit} className="mt-2 p-4">
          <label htmlFor="email" className="mb-2 tl">{t('emailLabel')}</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder={t('emailPlaceholder')}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form-text text-danger">
              <small>{formik.errors.email}</small>
            </div>
          ) : null}

          <label htmlFor="password" className="mb-2 tl">{t('passwordLabel')}</label>
          <input
            type="password"
            className="form-control mb-2"
            placeholder={t('passwordPlaceholder')}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="form-text text-danger">
              <small>{formik.errors.password}</small>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={!formik.isValid || formik.isSubmitting ? 'disabled mb-2 mt-2 rounded-2 bt' : 'mb-2 mt-2 rounded-2 bt'}
          >
            {t('loginButton')}
          </button>
        </form>
        <div className='px-4'>
          <p className="tl">{t('noAccountMessage')} <NavLink to={`/signUser`} className="tl">{t('create Account')}</NavLink></p>
          <p className="tl">{t('forgotPasswordMessage')} <NavLink to={`/forgot-password`} className="tl">{t('change Password')}</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
