import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux, renderWithRouter } from 'testutils/test-utils';
import VersioningList from 'ui/versioning/VersioningList';
import { LIST_VERSIONING_OK } from 'testutils/mocks/versioning';

const STARTING_PROPS = {
  loading: false,
  versioningList: LIST_VERSIONING_OK,
  contentTypes: [{ code: 'type 1', name: 'CType 1' }],
  onDidMount: () => {},
  fetchVersioningList: () => {},
  page: 1,
  pageSize: 10,
  totalItems: LIST_VERSIONING_OK.length,
};

describe('Test fetched versions list', () => {
  it('checks container rendered without crash with proper table headers', () => {
    const { getByText } = renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <VersioningList {...STARTING_PROPS} />
        </IntlProvider>,
      ),
    );
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Id')).toBeInTheDocument();
    expect(getByText('Content Type')).toBeInTheDocument();
    expect(getByText('Editor')).toBeInTheDocument();
    expect(getByText('Last Modify')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
  });
  it('check rendered items from list', () => {
    const { getByText } = renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <VersioningList {...STARTING_PROPS} />
        </IntlProvider>,
      ),
    );
    LIST_VERSIONING_OK.forEach((version) => {
      expect(getByText(version.id)).toBeInTheDocument();
    });
  });
});
