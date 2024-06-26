import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../axios/user';
import './Login.css';
import { NavLink } from 'react-router-dom';
import '../../i18n';
import { useTranslation } from 'react-i18next'; 

const LoginComponent = () => {
  const { t } = useTranslation(); 

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t('usernameRequired')), 
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
          alert('Login failed: ' + (error.response?.data?.message || error.message));
        });
    },
  });

  return (
    <div className="px-3">
      <div className="loginpage rounded-2">
        <form onSubmit={formik.handleSubmit} className="mt-2 p-4">
          <label htmlFor="username" className="mb-2 tl">{t('usernameLabel')}</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder={t('usernamePlaceholder')}
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="form-text text-danger">
              <small>{formik.errors.username}</small>
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
      </div>
      <div className="text-center">
        <p className="tl">{t('noAccountMessage')} <a className="tl" href="/signUser">{t('createAccountLink')}</a></p>
      </div>
    </div>
  );
};

export default LoginComponent;