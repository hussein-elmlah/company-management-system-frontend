import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language); 
  };

  return (
    <div className="btn-group">
      <button className="btn btn-link dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        {i18n.language === 'en' ? 'English' : 'العربية'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
        <li><button className="dropdown-item" onClick={() => changeLanguage('ar')}>العربية</button></li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
