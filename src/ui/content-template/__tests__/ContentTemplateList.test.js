import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';
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
    component = shallow(<ContentTemplateList {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has class ContentTemplateList__table', () => {
    expect(component.find('.ContentTemplateList__table').exists()).toBe(true);
  });

  it('called onDidMount and load rows same length with contentTemplates', () => {
    expect(props.onDidMount).toHaveBeenCalled();
    expect(component.find('ContentTemplateListItem')).toHaveLength(contentTemplates.length);
  });
});
