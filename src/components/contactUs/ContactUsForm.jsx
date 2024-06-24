import React from 'react'

export default function ContactUsForm() {
  return (
    <div className="contact mt-5">
    <div className="container">
      <div className="section-header text-center mb-5">
        <h2 className="mb-2">اتصل بنا</h2>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 py-1 px-5">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="الاسم"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="البريد الالكتروني"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="الموضوع"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="الرسالة"
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
  </div>  )
}
