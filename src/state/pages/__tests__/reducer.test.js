import reducer from 'state/pages/reducer';
import { setViewPages, setSearchPages } from 'state/pages/actions';

const initialState = {
  viewPages: [],
  searchPages: [],
};

describe('state/pages/reducer', () => {
  it('should return correct state with setViewPages action', () => {
    const payload = [{ test: 'test' }];
    const action = setViewPages(payload);
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      viewPages: payload,
    });
  });
  it('should return correct state with setSearchPages action', () => {
    const payload = [{ pages: ['a', 'b'] }];
    const action = setSearchPages(payload);
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      searchPages: payload,
    });
  });
});
