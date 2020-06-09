import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithReactIntl, renderWithRouter } from 'testutils/test-utils';
import VersioningList from 'ui/versioning/VersioningList';
import { LIST_VERSIONING_OK } from 'testutils/mocks/versioning';

const STARTING_PROPS = {
  loading: false,
  versioningList: LIST_VERSIONING_OK,
  onDidMount: () => {},
  fetchVersioningList: () => {},
  page: 1,
  pageSize: 10,
  totalItems: LIST_VERSIONING_OK.length,
};

describe('Test fetched versions list', () => {
  it('checks container rendered without crash with proper table headers', () => {
    const { getByText } = renderWithReactIntl(
      renderWithRouter(<VersioningList {...STARTING_PROPS} />),
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
    const { getByText } = renderWithReactIntl(
      renderWithRouter(<VersioningList {...STARTING_PROPS} />),
    );
    LIST_VERSIONING_OK.forEach((version) => {
      expect(getByText(version.id)).toBeInTheDocument();
    });
  });
});
