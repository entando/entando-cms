import menu from 'ui/common/LinkMenu';
import { cms as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';

const cms = {
  id: 'cms',
  menu,
  state,
  routes,
  routesDir,
  locales: {
    en,
    it,
  },
};

export default cms;
