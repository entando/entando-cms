import { isEmpty, isNull, isUndefined, get } from 'lodash';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_VERSIONING_CONTENT_HISTORY } from 'app-init/routes';

export const getActionText = (notification) => {
  const { actionName, parameters } = notification;
  switch (actionName.toUpperCase()) {
    case 'SAVE': {
      if (parameters.contentId) {
        return 'activityStream.saveContent';
      }
    }
    case 'SAVEANDAPPROVE':
      if (parameters.contentId) {
        return 'activityStream.saveContent';
      }
    default: return '';
  }
};

export const getTargetText = (notification, locale) => {
  if (isEmpty(notification.parameters)) return '';
  const { contentId } = notification.parameters;
  if (!isNull(contentId) && !isUndefined(contentId)) {
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