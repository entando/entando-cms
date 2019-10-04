import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { configEnzymeAdapter } from 'testutils/helpers';
import ContentSettingsCropRatiosContainer from 'ui/content-settings/ContentSettingsCropRatiosContainer';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

configEnzymeAdapter();

jest.mock(
  'ui/content-settings/ContentSettingsCropRatios',
  () => jest.fn(() => <div>ContentSettingsCropRatios</div>),
);

const initialState = {
  apps: {
    cms: {
      contentSettings: {
        cropRatios: [
          '4:9',
          '16:9',
        ],
      },
    },
  },
};

const store = configureMockStore([thunk])(initialState);

const actionList = [
  'onAdd',
  'onDelete',
];

describe('ContentSettingsCropRatiosContainer', () => {
  it('should render ContentSettingsCropRatios with correct props', () => {
    shallow(
      <ContentSettingsCropRatiosContainer store={store} />,
    ).dive().dive();

    expect(ContentSettingsCropRatios).toHaveBeenCalledWith(
      expect.objectContaining({
        ...initialState.contentSettings,
        ...actionList.reduce((acc, curr) => ({
          ...acc,
          [curr]: expect.any(Function),
        }), {}),
      }),
      {},
    );
  });
});
