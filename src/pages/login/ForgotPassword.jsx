 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/user.services';
import './Login.css';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('يجب ادخال البريد الالكتروني بشكل صحيح').required('يجب ادخال البريد الالكتروني'),
    }),
    onSubmit: (values, { resetForm }) => {
      UserService.requestPasswordReset(values.email)
        .then(() => {
          alert('Password reset email sent. Please check your email.');
          resetForm();
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error);
          alert('Error sending password reset email.');
        });
    },
  });

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <form onSubmit={formik.handleSubmit}>
          <h2>نسيت كلمة المرور</h2>
          <div className="mb-2">
            <label htmlFor="emailInput" className="form-label">البريد الالكتروني</label>
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
          <button
            type="submit"
            className="mb-2 mt-2 btn btn-primary"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            ارسال رابط استعادة كلمة المرور
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
