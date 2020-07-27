import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, DropdownButton, MenuItem } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { formatDate, hasAccess } from '@entando/utils';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import { SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION } from 'state/permissions/const';

import paginatorMessages from 'ui/common/paginatorMessages';

class ContentListCard extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  changePage(page) {
    const { onDidMount } = this.props;
    onDidMount(page);
  }

  renderRows() {
    const { contents } = this.props;
    if (!contents) {
      return null;
    }
    return (
      contents.map(({
        description, id, typeDescription, lastModified, lastEditor, status, onLine,
      }) => {
        const { color, title } = getContentStatusDetails(status, onLine);
        return (
          <tr className="VersioningListRow" key={id}>
            <td className="VersioningListRow__td SingleContentCurrentVersion__description">{description}</td>
            <td className="VersioningListRow__td">
              {lastEditor}
            </td>
            <td className="VersioningListRow__td">{typeDescription}</td>
            <td className="VersioningListRow__td text-center">
              <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
            </td>
            <td className="VersioningListRow__td text-center">
              {formatDate(lastModified)}
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const {
      intl, pagination: { page, totalItems }, contentTypes,
      onClickAddContent, userPermissions,
    } = this.props;
    const pagination = {
      page,
      perPage: 5,
      perPageOptions: [5],
    };
    const renderAddContentButton = hasAccess(
      [SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION], userPermissions,
    ) && (
      <DropdownButton
        bsStyle="primary"
        className="pull-right"
        title={intl.formatMessage({ id: 'cms.contents.add.title' })}
        id="addContent"
      >
        {
        contentTypes.map(contentType => (
          <MenuItem
            eventKey={contentType.code}
            key={contentType.code}
            onClick={() => onClickAddContent(
              { typeCode: contentType.code, typeDescription: contentType.name },
            )}
          >
            {contentType.name}
          </MenuItem>
        ))
      }
      </DropdownButton>
    );

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="ContentListCard">
        <h2>
          <FormattedMessage id="dashboard.content.title" defaultMessage="Content" />
          {renderAddContentButton}
        </h2>
        <table className="ContentListCardTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th width="35%"><FormattedMessage id="contentPicker.description" /></th>
              <th width="13%"><FormattedMessage id="cms.contents.versioning.author" /></th>
              <th width="15%"><FormattedMessage id="contentPicker.type" /></th>
              <th className="text-center" width="12%">
                <FormattedMessage id="contentPicker.status" />
              </th>
              <th className="text-center" width="25%"><FormattedMessage id="cms.versioning.list.lastModify" /></th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={totalItems}
          onPageSet={this.changePage}
          messages={messages}
        />
        <Clearfix />
      </div>
    );
  }
}

ContentListCard.propTypes = {
  intl: intlShape.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  onDidMount: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
  }),
  onClickAddContent: PropTypes.func.isRequired,
};

ContentListCard.defaultProps = {
  userPermissions: [],
  contents: [],
  contentTypes: [],
  pagination: {
    page: 1,
    totalItems: 0,
  },
};

export default injectIntl(ContentListCard);
