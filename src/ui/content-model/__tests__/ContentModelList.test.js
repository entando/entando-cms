import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';
import { GET_CONTENT_MODELS_RESPONSE_OK as contentModels } from 'testutils/mocks/contentModel';

import ContentModelList from 'ui/content-model/ContentModelList';

configEnzymeAdapter();

const props = {
  contentModels,
  onDidMount: jest.fn(),
};

let component;

describe('content-model/ContentModelList', () => {
  beforeEach(() => {
    component = shallow(<ContentModelList {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is a table', () => {
    expect(component.is('table')).toBe(true);
  });

  it('has class ContentModelList__table', () => {
    expect(component.hasClass('ContentModelList__table')).toBe(true);
  });

  it('called onDidMount and load rows same length with contentModels', () => {
    expect(props.onDidMount).toHaveBeenCalled();
    expect(component.find('ContentModelListItem')).toHaveLength(contentModels.length);
  });
});
