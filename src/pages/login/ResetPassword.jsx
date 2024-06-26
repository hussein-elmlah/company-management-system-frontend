 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../axios/user';
import './Login.css';

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8, 'يجب ادخال على الاقل 8 حروف لكلمة السر').required('يجب ادخال كلمة السر'),
    }),
    onSubmit: (values, { resetForm }) => {
      UserService.resetPassword(token, values.newPassword)
        .then(() => {
          alert('Password has been reset successfully.');
          resetForm();
          navigate('/login');
        })
        .catch((error) => {
          console.error('Error resetting password:', error);
          alert('Error resetting password.');
        });
    },
  });

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <form onSubmit={formik.handleSubmit}>
          <h2>إعادة تعيين كلمة المرور</h2>
          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label">كلمة السر الجديدة</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              {...formik.getFieldProps('newPassword')}
              placeholder="ادخل كلمة السر الجديدة"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="form-text text-danger">
                <small>{formik.errors.newPassword}</small>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="mb-2 mt-2 btn btn-primary"
            disabled={!formik.isValid}
          >
            إعادة تعيين كلمة السر
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
