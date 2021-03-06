import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import { messages } from '@entando/messages';
import contentTemplate from 'state/content-template/reducer';
import contentType from 'state/content-type/reducer';
import editContent from 'state/edit-content/reducer';
import loading from 'state/loading/reducer';
import modal from 'state/modal/reducer';
import pagination from 'state/pagination/reducer';
import categories from 'state/categories/reducer';
import assets from 'state/assets/reducer';
import contentSettings from 'state/content-settings/reducer';
import groups from 'state/groups/reducer';
import contents from 'state/contents/reducer';
import languages from 'state/languages/reducer';
import pages from 'state/pages/reducer';
import users from 'state/users/reducer';
import permissions from 'state/permissions/reducer';
import versioning from 'state/versioning/reducer';
import tableColumns from 'state/table-columns/reducer';
import tableColumnOrder from 'state/table-column-order/reducer';

export const cms = combineReducers({
  contentTemplate,
  contentType,
  editContent,
  categories,
  assets,
  contentSettings,
  contents,
  languages,
  pages,
  users,
  versioning,
  tableColumns,
});

export default combineReducers({
  apps: combineReducers({ cms }),
  api,
  currentUser,
  form,
  loading,
  locale,
  groups,
  messages,
  modal,
  permissions,
  categories,
  pagination,
  tableColumnOrder,
});
