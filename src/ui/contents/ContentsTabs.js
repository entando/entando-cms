import React from 'react';
import {
  TabContainer, Nav, NavItem, TabContent, TabPane,
  DropdownButton, MenuItem,
} from 'patternfly-react';
import {
  intlShape, FormattedMessage,
} from 'react-intl';
import PropTypes from 'prop-types';
import MultiSelectMenuItem from 'ui/common/form/MultiSelectMenuItem';

const ContentTabs = ({
  intl, availableColumns, messages, contentTypes, currentColumnsShow, currentAuthorShow,
  currentStatusShow, onSetCurrentColumnsShow, onSetCurrentStatusShow, onSetCurrentAuthorShow,
}) => {
  const navItems = (
    <div>
      <Nav bsClass="nav nav-tabs nav-tabs-pf nav-tabs-pf-secondary Contents__main-tab-bar" onSelect={null} style={{ fontSize: '14px' }}>
        <NavItem eventKey="draft">
          <FormattedMessage id="cms.contents.draft" defaultMessage="Draft" />
        </NavItem>
        <NavItem eventKey="toApprove">
          <FormattedMessage id="cms.contents.toApprove" defaultMessage="To Approve" />
        </NavItem>
        <NavItem eventKey="approved">
          <FormattedMessage id="cms.contents.approved" defaultMessage="Approved" />
        </NavItem>
        <NavItem eventKey="rejected">
          <FormattedMessage id="cms.contents.rejected" defaultMessage="Rejected" />
        </NavItem>
      </Nav>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="primary"
          title={intl.formatMessage(messages.addContent)}
          id="addContent"
          onClick={null}
        >
          {
            contentTypes.map(contentType => (
              <MenuItem
                eventKey={contentType.code}
                key={contentType.code}
              >
                {contentType.name}
              </MenuItem>
            ))
          }
        </DropdownButton>
      </div>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="default"
          title={intl.formatMessage(messages.downloadButton)}
          id="downloadAs"
          onClick={null}
        >
          <MenuItem eventKey="csv">
            CSV
          </MenuItem>
          <MenuItem eventKey="xls">
            XLS
          </MenuItem>
        </DropdownButton>
      </div>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="default"
          title={intl.formatMessage(messages.columns)}
          id="columns"
          onClick={null}
        >
          {
            availableColumns.map(
              ({ name, code }, i) => (
                <MultiSelectMenuItem
                  name={name}
                  i={i}
                  code={code}
                  key={code}
                  active={currentColumnsShow.includes(code)}
                  onItemClicked={onSetCurrentColumnsShow}
                />
              ),
            )
          }
        </DropdownButton>
      </div>
    </div>
  );
  return (
    <TabContainer
      id="secondary-tabs"
      activeKey={currentAuthorShow}
      onSelect={author => onSetCurrentAuthorShow(author)}
    >
      <div>
        <Nav bsStyle="tabs">
          <NavItem eventKey="allContents" title="All Contents">
            <FormattedMessage id="cms.contents.allContents" defaultMessage="All Contents" />
          </NavItem>
          <NavItem eventKey="onlyMine" title="Only Mine">
            <FormattedMessage id="cms.contents.onlyMine" defaultMessage="Only Mine" />
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey="allContents">
            <TabContainer
              id="secondary-tabs-1"
              activeKey={currentStatusShow}
              onSelect={status => onSetCurrentStatusShow(status)}
            >
              {navItems}
            </TabContainer>
          </TabPane>
          <TabPane eventKey="onlyMine">
            <TabContainer
              id="secondary-tabs-2"
              activeKey={currentStatusShow}
              onSelect={status => onSetCurrentStatusShow(status)}
            >
              {navItems}
            </TabContainer>
          </TabPane>
        </TabContent>
      </div>
    </TabContainer>
  );
};

ContentTabs.propTypes = {
  intl: intlShape.isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  messages: PropTypes.shape({}).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
};

export default ContentTabs;
