import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import ContactUsForm from '../../components/contactUs/ContactUsForm';
import '../../i18n';

const MainComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="main pt-2 mt-5">
      <div className="about mt-2" id='about'>
        <div className="container my-0 py-0">
          <div className="row aboutdiv">
            <div className="col-md-6 col-sm-12 p-4">
              <p className="fs-6">
                {t('about')}
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
              <h4>{t('ourProjects')}</h4>
            </div>
            <div className="col-md-3">
              <h1>20</h1>
              <h4>{t('yearsOfExperience')}</h4>
            </div>
            <div className="col-md-3">
              <h1>24</h1>
              <h4>{t('ongoingProjects')}</h4>
            </div>
            <div className="col-md-3">
              <h1>46</h1>
              <h4>{t('numberOfEmployees')}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mt-5">
        <div className="section-header my-5">
          <h2 className="mb-2">{t('services')}</h2>
        </div>
        <div className="services row">
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-calendar-check" aria-hidden="true"></i>
            <p>{t('engineeringConsultations')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <p>{t('executiveWorks')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-building" aria-hidden="true"></i>
            <p>{t('architecturalDesign')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cog" aria-hidden="true"></i>
            <p>{t('contractManagement')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-clock" aria-hidden="true"></i>
            <p>{t('interiorExteriorDesign')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('structuralDesignConsultations')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('projectPlansPreparation')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('allEngineeringPlans')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('threeDWorks')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('quantitySurvey')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('municipalityServices')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('urbanPlanning')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('projectConstructionManagement')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('projectManagement')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('differentProjectPlans')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('decorDesign')}</p>
          </div>
          <div className="single-service col-lg-4 col-md-6">
            <i className="fa fa-cubes" aria-hidden="true"></i>
            <p>{t('technicalSpecifications')}</p>
          </div>
        </div>
      </div>

      <div className="portfolio">
        <div className="container">
          <div className="row">
            <div className="section-header text-center mb-5">
              <h2 className="mb-2">{t('معرض الأعمال')}</h2>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="portfolio-item">
                <img
                  src="./src/assets/images/A_13-Photo.jpg"
                  className="img-fluid"
                  alt="Portfolio 1"
                />
                <div className="portfolio-overlay">
                  <h4>{t('Project Title')}</h4>
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
                  <h4>{t('Project Title')}</h4>
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
                  <h4>{t('Project Title')}</h4>
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
