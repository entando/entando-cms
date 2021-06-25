import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import { withRouter } from 'react-router-dom';

import { ROUTE_CMS_CONTENTS } from 'app-init/routes';
import { fetchContentType } from 'state/content-type/actions';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { getContent } from 'state/edit-content/selectors';
import { fetchContent } from 'state/edit-content/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getLanguages, getDefaultLanguage } from 'state/languages/selectors';

import ContentDraftDetails from 'ui/contents/ContentDraftDetails';

export const mapStateToProps = (state, { match: { params } }) => {
  const languages = (getLanguages(state) && getActiveLanguages(state)) || [];
  // const langCodes = languages.map(({ code }) => code);
  return {
    defaultLang: getDefaultLanguage(state),
    languages,
    contentId: params.id,
    content: getContent(state) || {},
    attributes: getSelectedContentTypeAttributes(state) || [],
    locale: getLocale(state),
  };
};

export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: (contentId) => {
    dispatch(fetchContentType(contentId.slice(0, -1)));
    dispatch(fetchContent(`/${contentId}`))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
    dispatch(fetchCategoryTreeAll());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
});

const ContentDraftDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentDraftDetails);

export default withRouter(ContentDraftDetailsContainer);
