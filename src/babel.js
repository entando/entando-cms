// state
import locale from 'state/locale/reducer';
import contentModel from 'state/content-model/reducer';
import contentType from 'state/content-type/reducer';
import editContent from 'state/edit-content/reducer';
import loading from 'state/loading/reducer';
import modal from 'state/modal/reducer';
import categories from 'state/categories/reducer';
import contentSettings from 'state/content-settings/reducer';

export const state = {
  locale,
  contentModel,
  contentType,
  editContent,
  loading,
  modal,
  categories,
  contentSettings,
};

export { routes } from 'ui/App';
