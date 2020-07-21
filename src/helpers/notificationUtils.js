import { isEmpty, isNull, isUndefined, get } from 'lodash';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_CONTENT_HISTORY } from 'app-init/routes';

export const getActionText = (notification) => {
  const { actionName, parameters, namespace } = notification;
  if (parameters.contentId || namespace === '/do/jacms/Content') {
    switch (actionName.toUpperCase()) {
      case 'SAVE': {
        return 'cms.activityStream.saveContent';
      }
      case 'SAVEANDAPPROVE':
        return 'cms.activityStream.saveContent';
      default: return '';
    }
  }
  return '';
};

export const getTargetText = (notification, locale) => {
  if (isEmpty(notification.parameters)) return '';
  const { namespace, parameters } = notification;
  const { contentId } = parameters;
  if ((!isNull(contentId) && !isUndefined(contentId)) || namespace === '/do/jacms/Content') {
    return get(notification.parameters, `Text:${locale}_Title`, contentId);
  }
  return '';
};

export const getTargetLink = (notification) => {
  const { contentId } = notification.parameters;
  if (!isNull(contentId) && !isUndefined(contentId)) {
    return routeConverter(ROUTE_CMS_VERSIONING_CONTENT_HISTORY, { contentId  });
  }
  return '';
};
