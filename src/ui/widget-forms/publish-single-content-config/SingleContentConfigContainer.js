import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import SingleContentConfigForm, { SingleContentConfigFormBody, SingleContentConfigContainerId } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { ROUTE_CMS_ADD_CONTENT } from 'app-init/routes';
import {
  formValueSelector, change,
} from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ContentsFilterModalID } from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';
import { fetchPage } from 'state/pages/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { setCurrentStatusShow } from 'state/contents/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  const formSelect = formValueSelector(formToUse);
  let widgetConfig = null;
  if (ownProps.widgetConfig !== null && ownProps.widgetConfig !== undefined) {
    const { contents, ...rest } = ownProps.widgetConfig;
    widgetConfig = rest;
  }
  return {
    contentTemplates: getContentTemplateList(state),
    initialValues: widgetConfig || {},
    chosenContent: widgetConfig,
    ownerGroup: formSelect(state, putPrefixField('ownerGroup')),
    joinGroups: formSelect(state, putPrefixField('joinGroups')),
    contentTypes: getContentTypeList(state),
    appTourProgress: getAppTourProgress(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchPage(ownProps.pageCode, PAGE_STATUS_DRAFT)).then((res) => {
        const { ownerGroup, joinGroups } = res.payload || {};
        dispatch(change(formToUse, putPrefixField('ownerGroup'), ownerGroup));
        dispatch(change(formToUse, putPrefixField('joinGroups'), joinGroups));
      });
    },
    putPrefixField,
    showFilterModal: (appTourProgress) => {
      if (appTourProgress === APP_TOUR_STARTED) {
        dispatch(setAppTourLastStep(19));
      }
      dispatch(setVisibleModal(ContentsFilterModalID));
    },
    onSelectContent: (selectContent) => {
      dispatch(change(formToUse, putPrefixField('contentId'), selectContent.id));
      dispatch(change(formToUse, putPrefixField('contentDescription'), selectContent.description));
      dispatch(setVisibleModal(''));
      dispatch(setAppTourLastStep(21));
    },
    onClickAddContent: (contentType) => {
      const {
        history, pageCode, widgetCode, frameId,
      } = ownProps;
      dispatch(setWorkMode(WORK_MODE_ADD));
      dispatch(setCurrentStatusShow('all'));
      dispatch(setNewContentsType(contentType));
      const newRoute = routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode });
      history.push(
        `${newRoute}?callbackWidget=${widgetCode}&callbackPage=${pageCode}&callbackFrame=${frameId}`,
      );
    },
  };
};

const beforeSubmit = (dispatch, values) => new Promise((resolve) => {
  const configItem = {
    ...values,
    ...(values.modelId != null && { modelId: values.modelId }),
  };
  dispatch(clearErrors());
  dispatch(setAppTourLastStep(22));
  resolve(configItem);
});

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigFormBody));

formBody.reduxFormId = SingleContentConfigContainerId;
formBody.beforeSubmit = beforeSubmit;

const SingleContentConfigContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));

SingleContentConfigContainer.reduxFormId = SingleContentConfigContainerId;
SingleContentConfigContainer.beforeSubmit = beforeSubmit;

export default SingleContentConfigContainer;
