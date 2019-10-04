import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ContentTypeReferenceStatus from 'ui/content-type/ContentTypeReferenceStatus';
import { fetchContentTypeReferenceStatus, sendPostContentTypeReferenceStatus } from 'state/content-type/actions';
import { getContentTypeReferencesStatus } from 'state/content-type/selectors';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';

export const mapStateToProps = state => ({
  status: getContentTypeReferencesStatus(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: () => dispatch(fetchContentTypeReferenceStatus()),
  onReload: contentTypesCodes => dispatch(sendPostContentTypeReferenceStatus(contentTypesCodes))
    .then((res) => {
      if (res) {
        history.push(ROUTE_CMS_CONTENTTYPE_LIST);
      }
    }),
});

const ContentTypeReferenceStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentTypeReferenceStatus);

export default withRouter(ContentTypeReferenceStatusContainer);
