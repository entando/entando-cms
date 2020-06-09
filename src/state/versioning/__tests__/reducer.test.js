import reducer from 'state/versioning/reducer';
import {
  setVersionings,
  setSelectedVersioningType,
} from 'state/versioning/actions';
import { getVersioningList, getSelectedVersioningType } from 'state/versioning/selectors';
import { LIST_VERSIONING_OK } from 'testutils/mocks/versioning';

describe('state/versioning/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an object and has required properties', () => {
      expect(typeof state).toBe('object');
      expect(state).toHaveProperty('list');
      expect(state).toHaveProperty('map');
      expect(state).toHaveProperty('selected');
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setVersionings', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setVersionings(LIST_VERSIONING_OK));
    });

    it('should define the versioning list payload', () => {
      expect(getVersioningList({
        apps: {
          cms: { versioning: newState },
        },
      })).toEqual(LIST_VERSIONING_OK);
    });
  });

  describe('after action setSelectedVersioningType', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedVersioningType('contents'));
    });

    it('should define the selected versioning type', () => {
      expect(getSelectedVersioningType({ apps: { cms: { versioning: newState } } })).toEqual('contents');
    });
  });
});
