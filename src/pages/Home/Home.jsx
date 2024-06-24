import React from 'react';
import './Home.css';
import ContactUsForm from '../../components/contactUs/ContactUsForm';

const MainComponent = () => {
  return (
    <div className="main pt-2 mt-5">
      <div className="about mt-2" id='about'>
        <div className="container my-0 py-0">
          <div className="row aboutdiv">
            <div className="col-md-6 col-sm-12 p-4">
              <p className="fs-6">
                قامت شركة 4TH.PYRAMID للتصميم والاستشارات الهندسية ، بالمملكة
                العربية السعودية ، بتصميم العديد من الهياكل والمباني والجسور
                والإشراف عليها. يتم توزيعها في جميع أنحاء مصر ومنطقة الخليج
                العربي وأفريقيا. لقد أدى طموحنا في ابتكار الأنظمة إلى تعزيز
                سمعة المملكة العربية السعودية لتحقيق إنجازات ملحوظة في مجال
                الهندسة الإنشائية. على مدار 20 عامًا ، واصلنا إكمال التصميمات
                الاقتصادية والمتفوقة. نحن نضمن عمل مهندسينا الإنشائيين عن كثب
                مع العملاء والمتعاونين والبقاء على اطلاع حتى يتمكنوا من
                الابتكار استجابة للتحديات والقيود. مجالات الخبرة (التصميم
                الإنشائي والإشراف) 1- الأبنية التقليدية. 2- الجسور. 3-
                الأنفاق. 4- المصانع. 5- المستشفيات. مواد البناء: 1- الخرسانة
                المسلحة. 2- الخرسانة سابقة الإجهاد. 3- الفولاذ الإنشائي. 4-
                أنظمة تحمل الجدار. بالإضافة إلى ذلك ، صممت المملكة العربية
                السعودية لإصلاح وتقوية العديد من الهياكل. الأنظمة المستخدمة هي
                الغلاف الخرساني والغطــاء الفولاذي وتغليف وتقوية FRP. نعمل مع
                المهندسين المعماريين ,والمدنيين والملاك للوصول إلى المتطلبات
                المعمارية بأفضل طريقة ممكنة وبأقل تكلفة.
              </p>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="imagebox">
                <img
                  src="./src/assets/images/about.png"
                  height="400"
                  alt="About Company"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="working">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1>512</h1>
              <h4>مشاريعنا</h4>
            </div>
            <div className="col-md-3">
              <h1>20</h1>
              <h4>سنة خبرة</h4>
            </div>
            <div className="col-md-3">
              <h1>24</h1>
              <h4>مشاريع جارية</h4>
            </div>
            <div className="col-md-3">
              <h1>46</h1>
              <h4>عدد الموظفين</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mt-5">
        <div className="section-header my-5">
          <h2 className="mb-2">خدماتنا</h2>
        </div>
        <div className="services row">
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-calendar-check" aria-hidden="true"></i>
            <p>استشارات هندسية فى إعداد مخططات الرسومات التنفيذية</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <p>اعمال تنفيذية و هندسية ادارة المشاريع</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-building" aria-hidden="true"></i>
            <p>مكتب هندسي للتصميم المعماري</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cog" aria-hidden="true"></i>
            <p>إدارة العقود والمناقصات فى مكتب هندسي واحد</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-clock" aria-hidden="true"></i>
            <p>مكتب هندسي اعمال و تصميم الديكور الداخلي والخارجي</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية فى التصميم الانشائي</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>إعداد مخططات لمشاريع مختلفة فى مكتب هندسي واحد</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لكافة مخططات هندسية</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية فى كل اعمال ثلاثة الابعاد</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لاعمال حصر الكميات</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لخدمات موقع بلدي وإصدار رخصة بناء</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية للتخطيط العمراني</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لخدمات بناء و ادارة المشاريع</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لإدارة المشاريع</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لكافة مشاريع التخطيط</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لإدارة المشروع</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لمشاريع البناء و الادارة</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لمشاريع التخطيط العمراني</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لإدارة المشاريع</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لجميع المشاريع المختلفة</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>مكتب هندسي لتصميم الديكور</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>استشارات هندسية لإعداد المواصفات الفنية</p>
          </div>
        </div>
      </div>

      <div className="portfolio">
        <div className="container">
          <div className="row">
            <div className="section-header text-center mb-5">
              <h2 className="mb-2">معرض الأعمال</h2>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portfolio-item">
                <img
                  src="./src/assets/images/A_13-Photo.jpg"
                  className="img-fluid"
                  alt="Portfolio 1"
                />
                <div className="portfolio-overlay">
                  <h4>Project Title</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portfolio-item">
                <img
                  src="./src/assets/images/A_11-Photo.jpg"
                  className="img-fluid"
                  alt="Portfolio 2"
                />
                <div className="portfolio-overlay">
                  <h4>Project Title</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portfolio-item">
                <img
                  src="./src/assets/images/A_12-Photo.jpg"
                  className="img-fluid"
                  alt="Portfolio 3"
                />
                <div className="portfolio-overlay">
                  <h4>Project Title</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<ContactUsForm/>
    </div>
  );
};

export default MainComponent;
