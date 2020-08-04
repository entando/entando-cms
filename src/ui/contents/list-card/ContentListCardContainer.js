import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { fetchContents } from 'state/contents/actions';
import { getContentsWithNamespace } from 'state/contents/selectors';

import { withPermissionValues } from 'ui/common/auth/withPermissions';

import { getPagination } from 'state/pagination/selectors';

import ContentListCard from 'ui/contents/list-card/ContentListCard';
import { setWorkMode, setNewContentsType } from 'state/edit-content/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { ROUTE_CMS_ADD_CONTENT } from 'app-init/routes';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';

const namespace = 'contentsTile';

const mapStateToProps = state => ({
  contents: getContentsWithNamespace(state, namespace),
  contentTypes: getContentTypeList(state),
  pagination: getPagination(state, namespace),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: (page = 1) => {
    dispatch(fetchContents({ page, pageSize: 5 }, '?sort=lastModified&direction=DESC', namespace));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }, '', namespace));
  },
  onClickAddContent: (contentType) => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(setNewContentsType(contentType));
    history.push(
      routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode }),
    );
  },
});

const ContentsStatusCardContainer = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ContentListCard));

export default withPermissionValues(ContentsStatusCardContainer);
