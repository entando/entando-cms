import reducer from 'state/pages/reducer';
import { setViewPages } from 'state/pages/actions';

const initialState = {
  viewPages: [],
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
});
