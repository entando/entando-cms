
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setLanguage } from 'state/locale/actions';
import { SET_LANGUAGE } from 'state/locale/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_LANG = {
  type: SET_LANGUAGE,
  payload: {
    locale: 'en',
  },
};

it('test setLanguage action', () => {
  expect(setLanguage('en')).toEqual(DEFAULT_LANG);
});

describe('setCurrentLanguage', () => {
  it('it locale', () => {
    const store = mockStore(DEFAULT_LANG);
    store.dispatch(setLanguage('it'));
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', SET_LANGUAGE);
    expect(actions[0].payload.locale).toEqual('it');
  });

  it('en locale as default value', () => {
    const store = mockStore(DEFAULT_LANG);
    store.dispatch(setLanguage('en'));
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', SET_LANGUAGE);
    expect(actions[0].payload).toHaveProperty('locale', 'en');
  });
});
