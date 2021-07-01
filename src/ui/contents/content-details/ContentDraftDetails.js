import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs, Tab } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import ContentDraftDetailsInfoCollapse from 'ui/contents/content-details/ContentDetailsInfoCollapse';
import ContentDetailsAttributes from 'ui/contents/content-details/ContentDetailsAttributes';

const ContentDraftDetails = ({
  content,
  contentId,
  attributes,
  onDidMount,
  languages,
  defaultLang,
}) => {
  const [selectedLang, setSelectedLang] = useState('en');
  useEffect(() => {
    onDidMount(contentId);
  }, [contentId]);

  const handleSelectedLang = selected => setSelectedLang(selected);

  return (
    <div>
      <ContentDraftDetailsInfoCollapse content={content} />
      <Row>
        <Col xs={12}>
          <Tabs
            defaultActiveKey={defaultLang}
            animation={false}
            id="content-attributes-tabs"
            onSelect={handleSelectedLang}
          >
            {languages.map(({ code, isDefault }) => (
              <Tab key={code} eventKey={code} title={<FormattedMessage id={`cms.language.${code}`} />}>
                <ContentDetailsAttributes
                  contentAttributes={content.attributes || []}
                  attributes={attributes}
                  languageSelected={selectedLang}
                  isDefaultLang={isDefault}
                />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

ContentDraftDetails.propTypes = {
  content: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentId: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  defaultLang: PropTypes.string.isRequired,
};

export default ContentDraftDetails;
