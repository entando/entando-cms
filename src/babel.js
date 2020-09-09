import menu from 'ui/common/LinkMenu';
import { cms as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';
import SingleContentConfigContainer, { formBody as SingleContentConfigBody } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigContainer';
import MultipleContentsConfigContainer, { formBody as MultipleContentsConfigBody } from 'ui/widget-forms/MultipleContentsConfigContainer';
import ContentsQueryConfigContainer, { formBody as ContentsQueryFormBody } from 'ui/widget-forms/ContentsQueryConfigContainer';
import ContentsStatusCardContainer from 'ui/contents/status-card/ContentsStatusCardContainer';
import ContentListCardContainer from 'ui/contents/list-card/ContentListCardContainer';

const cms = {
  id: 'cms',
  menu,
  state,
  routes,
  routesDir,
  dashboardCards: {
    contentsStatusCard: ContentsStatusCardContainer,
    contentsListCard: ContentListCardContainer,
  },
  locales: {
    en,
    it,
  },
  widgetForms: {
    // widgetCode: content_viewer
    viewerConfig: {
      default: SingleContentConfigContainer,
      body: SingleContentConfigBody,
    },
    // widgetCode: content_viewer_list
    listViewerConfig: {
      default: ContentsQueryConfigContainer,
      body: ContentsQueryFormBody,
    },
    // widgetCode: row_content_viewer_list
    rowListViewerConfig: {
      default: MultipleContentsConfigContainer,
      body: MultipleContentsConfigBody,
    },
  },
  persistData: {
    tableColumns: ['currentColumnsShow'],
  },
};

export default cms;
