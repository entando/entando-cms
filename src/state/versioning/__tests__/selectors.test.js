import {
  getVersionings,
  getVersioningsIdList,
  getVersioningsMap,
  getSelectedVersioningType,
  getVersioningList,
  getDetailedContentVersion,
} from 'state/versioning/selectors';

const versioningSlice = {
  list: [1],
  map: {
    1: { code: 2 },
  },
  selected: 'contents',
  contentVersionDetails: {
    id: 'ART1',
  },
};

const TEST_STATE = {
  apps: {
    cms: {
      versioning: versioningSlice,
    },
  },
};

describe('state/versioning/selectors', () => {
  it('getVersionings(state) returns the versioning object', () => {
    const selected = getVersionings(TEST_STATE);
    expect(selected).toBe(versioningSlice);
  });

  it('verify getVersioningsIdList selector', () => {
    expect(getVersioningsIdList(TEST_STATE))
      .toEqual(versioningSlice.list);
  });

  it('verify getVersioningsMap selector', () => {
    expect(getVersioningsMap(TEST_STATE))
      .toEqual(versioningSlice.map);
  });

  it('verify getSelectedVersioningType selector', () => {
    expect(getSelectedVersioningType(TEST_STATE))
      .toEqual('contents');
  });

  it('verify getDetailedContentVersion selector', () => {
    expect(getDetailedContentVersion(TEST_STATE))
      .toEqual({ id: 'ART1' });
  });

  it('verify getVersioningList returns correct values', () => {
    const versions = getVersioningList(TEST_STATE);
    expect(versions).toEqual([{ code: 2 }]);
  });
});
