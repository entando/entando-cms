import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux, renderWithRouter } from 'testutils/test-utils';
import AttachmentsList from 'ui/versioning/attachments/AttachmentsList';
import { LIST_ATTACHMENTS_OK } from 'testutils/mocks/versioning';


const STARTING_PROPS = {
  attachments: LIST_ATTACHMENTS_OK,
};

describe('AttachmentsList', () => {
  it('renders without crash with attachments and actions', () => {
    const { getByText, getAllByText } = renderWithRedux(
      renderWithRouter(
        <IntlProvider locale="en">
          <AttachmentsList {...STARTING_PROPS} />
        </IntlProvider>,
      ),
    );

    expect(getAllByText('Recover')).toHaveLength(LIST_ATTACHMENTS_OK.length);
    expect(getAllByText('Remove')).toHaveLength(LIST_ATTACHMENTS_OK.length);
    expect(getByText(LIST_ATTACHMENTS_OK[0].description)).toBeInTheDocument();
    expect(getByText(LIST_ATTACHMENTS_OK[0].lastVersion)).toBeInTheDocument();
    expect(getByText(LIST_ATTACHMENTS_OK[0].fileName)).toBeInTheDocument();
  });

  describe('renders correct file sizes', () => {
    it('in Bs', () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[0]]} />
          </IntlProvider>,
        ),
      );

      expect(getByTestId('size-badge')).toContainHTML(`${LIST_ATTACHMENTS_OK[0].sizeBytes} B`);
    });

    it('in KBs', () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[1]]} />
          </IntlProvider>,
        ),
      );

      expect(getByTestId('size-badge')).toContainHTML('1 KB');
    });

    it('in MBs', () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[2]]} />
          </IntlProvider>,
        ),
      );

      expect(getByTestId('size-badge')).toContainHTML('1 MB');
    });

    it('in GBs', () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[3]]} />
          </IntlProvider>,
        ),
      );

      expect(getByTestId('size-badge')).toContainHTML('1 GB');
    });

    it('in TBs', () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(
          <IntlProvider locale="en">
            <AttachmentsList attachments={[LIST_ATTACHMENTS_OK[4]]} />
          </IntlProvider>,
        ),
      );

      expect(getByTestId('size-badge')).toContainHTML('1 TB');
    });
  });
});
