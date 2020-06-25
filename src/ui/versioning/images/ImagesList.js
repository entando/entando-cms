import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
  Paginator,
} from 'patternfly-react';

import ImagesListItem from 'ui/versioning/images/ImagesListItem';
import FileVersioningSearchForm from 'ui/versioning/common/FileVersioningSearchForm';
import RecoverResourceModalContainer from 'ui/versioning/common/RecoverResourceModalContainer';

const perPageOptions = [5, 10, 15, 25, 50];

class ImagesList extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  changePage(page) {
    const { fetchImages, pagination: { pageSize } } = this.props;
    fetchImages({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchImages } = this.props;
    fetchImages({ page: 1, pageSize });
  }

  render() {
    const {
      loading,
      images,
      pagination: {
        page,
        pageSize,
      },
      totalItems,
      onSubmit,
      removeImage,
      recoverImage,
    } = this.props;

    return (
      <Spinner loading={!!loading}>
        <FileVersioningSearchForm onSubmit={onSubmit} />
        <ListView>
          {images.map(
            image => (
              <ImagesListItem
                key={image.id}
                image={image}
                onClickRemove={removeImage}
                onClickRecover={recoverImage}
              />
            ),
          )}
          <Paginator
            pagination={{
              page,
              perPage: pageSize,
              perPageOptions,
            }}
            viewType="list"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
        </ListView>
        <RecoverResourceModalContainer resourceType="image" />
      </Spinner>
    );
  }
}

ImagesList.propTypes = {
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  fetchImages: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  images: PropTypes.arrayOf(PropTypes.shape()),
  removeImage: PropTypes.func,
  recoverImage: PropTypes.func,
  totalItems: PropTypes.number,
};

ImagesList.defaultProps = {
  onDidMount: () => {},
  fetchImages: () => {},
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  images: [],
  totalItems: 0,
  removeImage: () => {},
  recoverImage: () => {},
};

export default ImagesList;
