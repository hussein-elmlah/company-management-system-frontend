import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeDirection = (language) => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    changeDirection(language);
  };

  return (
    <div className="btn-group">
      <button className="btn btn-link dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        {i18n.language === 'en' ? 'en' : 'ar'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
        <li><button className="dropdown-item" onClick={() => changeLanguage('ar')}>العربية</button></li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
