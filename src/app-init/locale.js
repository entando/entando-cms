import { addLocaleData } from 'react-intl';
import enLocale from 'locales/en';
import itLocale from 'locales/it';
/* ('en' is included by default) */
import itLocaleData from 'react-intl/locale-data/it';

addLocaleData(itLocaleData);

export default enLocale;
export { itLocale, enLocale };
