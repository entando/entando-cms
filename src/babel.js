import menu from 'ui/common/LinkMenu';
import { cms as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';
import HandpickedContentConfigFormContainer from 'ui/widget-forms/HandpickedContentConfigFormContainer';
import HandpickedContentListConfigFormContainer from 'ui/widget-forms/HandpickedContentListConfigFormContainer';
import ContentsQueryContainer from 'ui/widget-forms/ContentsQueryContainer';

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
  widgetForms: {
    content_viewer: HandpickedContentConfigFormContainer,
    content_viewer_list: ContentsQueryContainer,
    row_content_viewer_list: HandpickedContentListConfigFormContainer,
    search_result: null,
  },
};

export default cms;
