import { connect } from 'react-redux';

import { fetchContents } from 'state/contents/actions';
import { getContentList } from 'state/contents/selectors';
import ContentList from 'ui/content/list/ContentList';

export const mapStateToProps = state => (
  {
    contents: getContentList(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchContents(page, 'status=published'));
  },
});

const ContentListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentList);

export default ContentListContainer;
