 




 
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../axios/user';
import './Login.css';
import { NavLink } from 'react-router-dom';

const LoginComponent = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('يجب ادخال البريد الالكتروني بشكل صحيح').required('يجب ادخال البريد الالكتروني'),
      password: Yup.string().min(8, 'يجب ادخال على الاقل 8 حروف لكلمة السر').required('يجب ادخال كلمة السر'),
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
          <label htmlFor="email" className="mb-2 tl">البريد الالكتروني</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="ادخل البريد الالكتروني"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form-text text-danger">
              <small>{formik.errors.email}</small>
            </div>
          ) : null}

          <label htmlFor="password" className="mb-2 tl">كلمة السر</label>
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
            disabled={!formik.isValid || formik.isSubmitting}
            className={!formik.isValid || formik.isSubmitting ? 'disabled mb-2 mt-2 rounded-2 bt' : 'mb-2 mt-2 rounded-2 bt'}
          >
            تسجيل الدخول
          </button>
        </form>
        <p className="tl">ليس لديك حساب ؟ <NavLink to={`/signUser`} className="tl" > انشئ حساب </NavLink> </p>
        <p className="tl">نسيت كلمة السر؟ <NavLink to={`/forgot-password`} className="tl" > استعادة كلمة السر </NavLink> </p>
      </div>
      <div className="text-center">
      </div>
    </div>
  );
};

export default LoginComponent;
