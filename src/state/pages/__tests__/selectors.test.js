import { getViewPages, getSearchPagesRaw } from 'state/pages/selectors';
import { VIEWPAGES_PAYLOAD } from 'testutils/mocks/pages';

const state = {
  apps: {
    cms: {
      pages: {
        viewPages: VIEWPAGES_PAYLOAD,
        searchPages: ['a', 'b'],
      },
    },
  },
};

describe('state/pages/selectors', () => {
  it('getViewPages should return correct data from state', () => {
    expect(getViewPages(state)).toEqual(VIEWPAGES_PAYLOAD);
  });
  it('getSearchPagesRaw should return correct data from state', () => {
    expect(getSearchPagesRaw(state)).toEqual(['a', 'b']);
  });
});
