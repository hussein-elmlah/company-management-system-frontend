import './UserSignup.css';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import UserService from '../../../axios/user';
import { useTranslation } from 'react-i18next'; 
import './UserSignup.css';
import '../../../i18n';

const UserSignupComponent = () => {
  const { t } = useTranslation(); 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t('firstNameRequired')),
      lastName: Yup.string().required(t('lastNameRequired')),
      username: Yup.string().required(t('usernameRequired')),
      mobileNumber: Yup.string().required(t('mobileNumberRequired')),
      email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
      password: Yup.string().min(8, t('passwordMinLength')).required(t('passwordRequired')),
    }),
    onSubmit: (values, { resetForm }) => {
      UserService.createUser(values)
        .then((response) => {
          console.log(response.headers);
          alert(t('signupSuccess'));
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
            <label htmlFor="firstNameInput" className="form-label textf">{t('firstNameLabel')}</label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              {...formik.getFieldProps('firstName')}
              placeholder={t('firstNamePlaceholder')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.firstName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="lastNameInput" className="form-label textf">{t('lastNameLabel')}</label>
            <input
              type="text"
              className="form-control"
              id="lastNameInput"
              {...formik.getFieldProps('lastName')}
              placeholder={t('lastNamePlaceholder')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="form-text text-danger">
                <small>{formik.errors.lastName}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="usernameInput" className="form-label textf">{t('usernameLabel')}</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              {...formik.getFieldProps('username')}
              placeholder={t('usernamePlaceholder')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="form-text text-danger">
                <small>{formik.errors.email}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="mobileNumber" className="form-label textf">{t('mobileNumberLabel')}</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumberInput"
              {...formik.getFieldProps('mobileNumber')}
              placeholder={t('mobileNumberPlaceholder')}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className="form-text text-danger">
                <small>{formik.errors.mobileNumber}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="emailInput" className="form-label textf">{t('emailLabel')}</label>
            <input
              type="text"
              className="form-control"
              id="emailInput"
              {...formik.getFieldProps('email')}
              placeholder={t('emailPlaceholder')}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="form-text text-danger">
                <small>{formik.errors.username}</small>
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label textf">{t('passwordLabel')}</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              {...formik.getFieldProps('password')}
              placeholder={t('passwordPlaceholder')}
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
            disabled={!formik.isValid}
          >
            {t('createAccountButton')}
          </button>
        </form>
      </div>
      <div className="text-center">
        <p className="textf">{t('haveAccountMessage')}
          <NavLink to={`/login`} className="textf">{t('loginLink')}</NavLink>
           </p>
      </div>
    </div>
  );
};

export default UserSignupComponent;
