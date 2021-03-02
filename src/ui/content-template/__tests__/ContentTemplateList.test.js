import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mockRenderWithRouter, mockRenderWithIntl } from 'testutils/helpers';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK as contentTemplates } from 'testutils/mocks/contentTemplate';

import ContentTemplateList from 'ui/content-template/ContentTemplateList';

const props = {
  contentTemplates,
  onDidMount: jest.fn(),
  fetchList: () => {},
  page: 1,
  pageSize: 10,
  totalItems: 10,
  onClickDelete: () => {},
};

const renderComponent = () => render(mockRenderWithRouter(
  mockRenderWithIntl(
    <ContentTemplateList {...props} />,
    {
      modal: { info: {}, visiableModal: '' },
    },
  ),
));

describe('content-template/ContentTemplateList', () => {
  it('renders component without crashing', () => {
    const { container } = renderComponent(<ContentTemplateList {...props} />);
    expect(container.querySelector('.ContentTemplateList__wrap')).toBeInTheDocument();
  });

  it('has class ContentTemplateList__table', () => {
    const { container } = renderComponent(<ContentTemplateList {...props} />);
    expect(container.querySelector('.ContentTemplateList__table')).toBeInTheDocument();
  });

  it('called onDidMount and load rows same length with contentTemplates', () => {
    const { container } = renderComponent(<ContentTemplateList {...props} />);
    expect(props.onDidMount).toHaveBeenCalled();
    expect(container.querySelectorAll('.ContentTemplateList')).toHaveLength(contentTemplates.length);
  });

  it('last column is a DropdownKebab Component', () => {
    const { container } = renderComponent(<ContentTemplateList {...props} />);
    const last = container.querySelector('tr td:last-child');
    expect(last.classList.contains('text-center')).toBe(true);
    const kebab = last.querySelector('.dropdown.btn-group.dropdown-kebab-pf');
    const tooltipBtn = kebab.querySelector('button.btn.dropdown-toggle.btn-link');
    expect(kebab).toBeInTheDocument();
    expect(tooltipBtn).toBeInTheDocument();
  });
});
