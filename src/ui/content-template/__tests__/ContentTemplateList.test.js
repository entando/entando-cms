import React from 'react';
import { configEnzymeAdapter, shallowWithIntl } from 'testutils/helpers';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK as contentTemplates } from 'testutils/mocks/contentTemplate';

import ContentTemplateList from 'ui/content-template/ContentTemplateList';

configEnzymeAdapter();

const props = {
  contentTemplates,
  onDidMount: jest.fn(),
  fetchList: () => {},
  page: 1,
  pageSize: 10,
  totalItems: 10,
  onClickDelete: () => {},
};

let component;

describe('content-template/ContentTemplateList', () => {
  beforeEach(() => {
    component = shallowWithIntl(<ContentTemplateList {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
