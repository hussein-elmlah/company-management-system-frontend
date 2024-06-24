import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { sendContactMessage } from '../../store/slices/contactSlice';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData));
  };
  useEffect(() => {
    if (status === 'succeeded') {
      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال!',
        text: 'تم إرسال رسالتك بنجاح.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else if (status === 'failed' && error) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: 'حدث خطأ أثناء إرسال رسالتك. حاول مرة أخرى.',
      });
    }
  }, [status, error]);
  return (
    <div className="contact mt-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="mb-2">اتصل بنا</h2>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 py-1 px-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="البريد الالكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="الموضوع"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="الرسالة"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  ارسال الرسالة
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 px-5">
            <div className="contact-info px-2">
              <div className="contact-item">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <h4>العنوان</h4>
                <p>عنوان الشركة</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <h4>الهاتف</h4>
                <p>+1234567890</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <h4>البريد الإلكتروني</h4>
                <p>info@example.com</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <h4>ساعات العمل</h4>
                <p>من الأحد إلى الخميس, 9:00 صباحًا - 5:00 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
