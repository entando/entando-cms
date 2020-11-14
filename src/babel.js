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

const widgetFormsWithWidgetCodes = {  
  'content_viewer': {
    default: SingleContentConfigContainer,
    body: SingleContentConfigBody,
  },  
  'content_viewer_list': {
    default: ContentsQueryConfigContainer,
    body: ContentsQueryFormBody,
  },  
  'row_content_viewer_list': {
    default: MultipleContentsConfigContainer,
    body: MultipleContentsConfigBody,
  },
};

const widgetForms = {
  ...widgetFormsWithWidgetCodes,
  // config action for widgetCode content_viewer
  viewerConfig: widgetFormsWithWidgetCodes['content_viewer'],
  // config action for widgetCode content_viewer_list
  listViewerConfig: widgetFormsWithWidgetCodes['content_viewer_list'],
  // config action for widgetCode row_content_viewer_list
  rowListViewerConfig: widgetFormsWithWidgetCodes['row_content_viewer_list'],
};

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
  widgetForms,
  persistData: {
    tableColumns: ['currentColumnsShow'],
  },
};

export default cms;
