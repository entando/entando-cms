import menu from 'ui/common/LinkMenu';
import { cms as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';
import SingleContentConfigContainer from 'ui/widget-forms/publish-single-content-config/SingleContentConfigContainer';
import MultipleContentsConfigContainer from 'ui/widget-forms/MultipleContentsConfigContainer';
import ContentsQueryConfigContainer from 'ui/widget-forms/ContentsQueryConfigContainer';
import ContentsStatusCardContainer from 'ui/contents/status-card/ContentsStatusCardContainer';
import { getActionText, getTargetText, getTargetLink } from 'helpers/notificationUtils';

const cms = {
  id: 'cms',
  menu,
  state,
  routes,
  routesDir,
  dashboardCards: {
    contentsStatusCard: ContentsStatusCardContainer,
  },
  locales: {
    en,
    it,
  },
  widgetForms: {
    content_viewer: SingleContentConfigContainer,
    content_viewer_list: ContentsQueryConfigContainer,
    row_content_viewer_list: MultipleContentsConfigContainer,
    search_result: null,
  },
  persistData: {
    tableColumns: ['currentColumnsShow'],
  },
  notificationMaker: {
    getActionText,
    getTargetText,
    getTargetLink,
  },
};

export default cms;
