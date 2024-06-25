import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { sendContactMessage } from '../../store/slices/contactSlice';

const ContactUsForm = () => {
  const { t, i18n } = useTranslation();
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
        title: t('Sent!'),
        text: t('Your message has been sent successfully.'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else if (status === 'failed' && error) {
      Swal.fire({
        icon: 'error',
        title: t('Error!'),
        text: t('An error occurred while sending your message. Please try again.'),
      });
    }
  }, [status, error, t]);

  return (
    <div className={`contact mt-5 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="mb-2">{t('Contact Us')}</h2>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 py-1 px-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={t('Name')}
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
                  placeholder={t('Email')}
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
                  placeholder={t('Subject')}
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
                  placeholder={t('Message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  {t('Send Message')}
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 px-5">
            <div className="contact-info px-2">
              <div className="contact-item">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <h4>{t('Address')}</h4>
                <p>{t('Company Address')}</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <h4>{t('Phone')}</h4>
                <p>+1234567890</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <h4>{t('Email')}</h4>
                <p>info@example.com</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <h4>{t('Business Hours')}</h4>
                <p>{t('Sunday to Thursday, 9:00 AM - 5:00 PM')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
