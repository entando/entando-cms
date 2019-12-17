import { getViewPages } from 'state/pages/selectors';
import { VIEWPAGES_PAYLOAD } from 'testutils/mocks/pages';

const state = {
  apps: {
    cms: {
      pages: {
        viewPages: VIEWPAGES_PAYLOAD,
      },
    },
  },
};

describe('state/pages/selectors', () => {
  it('getViewPages should return correct data from state', () => {
    expect(getViewPages(state)).toEqual(VIEWPAGES_PAYLOAD);
  });
});
