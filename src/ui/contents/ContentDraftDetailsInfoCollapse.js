import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, Panel } from 'react-bootstrap';
import { Row, Col, Icon } from 'patternfly-react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

const ContentDraftDetailsInfoCollapse = ({ content }) => {
  const [infoOpened, setInfoOpened] = useState(false);
  const { description, id, lastModified, created, version, mainGroup } = content;
  return (
    <Fragment>
      <Row className="ContentDetails__panel-control-row">
        <Col xs={12}>
          <ButtonToolbar className="pull-left">
            <Button
              className="btn btn-primary"
              bsStyle="default"
              onClick={() => setInfoOpened(!infoOpened)}
            >
              <span>
                <Icon
                  name={infoOpened ? 'angle-down' : 'angle-right'}
                  className="ContentDetails__btn-icon--svg"
                />
                Metadata
              </span>
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Panel
            className="ContentDetails__info-panel"
            id="collapsible-info-table"
            expanded={infoOpened}
            onToggle={() => {}}
          >
            <Panel.Collapse>
              <table className="table ContentDetails__table-info-panel">
                <tbody>
                  <tr>
                    <th><FormattedMessage id="app.title" /></th>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <th><FormattedMessage id="app.code" /></th>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <th><FormattedMessage id="cms.contentLabel.lastModified" /></th>
                    <td>{moment(lastModified, 'YYYY-MM-DD').fromNow()}</td>
                  </tr>
                  <tr>
                    <th><FormattedMessage id="cms.contentLabel.dateCreated" /></th>
                    <td>{created}</td>
                  </tr>
                  <tr>
                    <th><FormattedMessage id="cms.contentLabel.version" /></th>
                    <td>{version}</td>
                  </tr>
                  <tr>
                    <th><FormattedMessage id="cms.contentLabel.mainGroup" /></th>
                    <td>{mainGroup}</td>
                  </tr>
                </tbody>
              </table>
            </Panel.Collapse>
          </Panel>
        </Col>
      </Row>
    </Fragment>
  );
};

ContentDraftDetailsInfoCollapse.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    lastModified: PropTypes.string,
    created: PropTypes.string,
    version: PropTypes.string,
    mainGroup: PropTypes.string,
  }).isRequired,
};

export default ContentDraftDetailsInfoCollapse;
