import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createMockStore, mockApi } from 'testutils/helpers';

import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, TOGGLE_PAGE_EXPANDED, SET_VIEWPAGES, SEARCH_PAGES,
} from 'state/pages/types';
import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD,
} from 'testutils/mocks/pages';
import {
  getPage, getPageChildren, getViewPages, getSearchPages,
} from 'api/pages';
import { getStatusMap } from 'state/pages/selectors';

import {
  addPages, setPageLoading, setPageLoaded, togglePageExpanded,
  handleExpandPage, fetchViewPages, setViewPages, setSearchPages, fetchSearchPages,
} from 'state/pages/actions';

jest.mock('state/pages/selectors', () => ({
  getStatusMap: jest.fn(),
}));

jest.mock('api/pages', () => ({
  getViewPages: jest.fn(mockApi({ payload: [] })),
  getSearchPages: jest.fn(mockApi({ payload: [] })),
  getPage: jest.fn(),
  getPageChildren: jest.fn(),
}));

const mockStore = configureStore([thunk]);

const INITIALIZED_STATE = {
  pages: {
    map: {
      homepage: HOMEPAGE_PAYLOAD,
      dashboard: DASHBOARD_PAYLOAD,
      service: SERVICE_PAYLOAD,
      contacts: CONTACTS_PAYLOAD,
      error: ERROR_PAYLOAD,
      login: LOGIN_PAYLOAD,
      notfound: NOTFOUND_PAYLOAD,
    },
    childrenMap: {
      homepage: HOMEPAGE_PAYLOAD.children,
      dashboard: DASHBOARD_PAYLOAD.children,
      service: SERVICE_PAYLOAD.children,
      contacts: CONTACTS_PAYLOAD.children,
      error: ERROR_PAYLOAD.children,
      login: LOGIN_PAYLOAD.children,
      notfound: NOTFOUND_PAYLOAD.children,
    },
    titlesMap: {
      homepage: HOMEPAGE_PAYLOAD.titles,
      dashboard: DASHBOARD_PAYLOAD.titles,
      service: SERVICE_PAYLOAD.titles,
      contacts: CONTACTS_PAYLOAD.titles,
      error: ERROR_PAYLOAD.titles,
      login: LOGIN_PAYLOAD.titles,
      notfound: NOTFOUND_PAYLOAD.titles,
    },
    statusMap: {
      homepage: { expanded: true, loading: false, loaded: true },
      dashboard: {},
      service: {},
      contacts: {},
      error: {},
      login: {},
      notfound: {},
    },
    freePages: FREE_PAGES_PAYLOAD,
    search: [],
  },
};

const PAGE_CODE = 'pagecode';

beforeEach(jest.clearAllMocks);

describe('state/pages/actions', () => {
  it('addPages() should return a well formed action', () => {
    const PAGES = [];
    const action = addPages(PAGES);
    expect(action.type).toBe(ADD_PAGES);
    expect(action.payload).toEqual({ pages: PAGES });
  });

  it('setPageLoading() should return a well formed action', () => {
    const action = setPageLoading(PAGE_CODE);
    expect(action.type).toBe(SET_PAGE_LOADING);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE });
  });

  it('setPageLoaded() should return a well formed action', () => {
    const action = setPageLoaded(PAGE_CODE);
    expect(action.type).toBe(SET_PAGE_LOADED);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE });
  });

  it('togglePageExpanded() should return a well formed action', () => {
    const action = togglePageExpanded(PAGE_CODE, true);
    expect(action.type).toBe(TOGGLE_PAGE_EXPANDED);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE, expanded: true });
  });

  describe('handleExpandPage()', () => {
    beforeEach(() => {
      getStatusMap.mockReturnValue(INITIALIZED_STATE.pages.statusMap);
      getPage.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
      getPageChildren.mockImplementation(mockApi({ payload: [CONTACTS_PAYLOAD] }));
    });

    it('when loading an already expanded page (homepage) set page expanded to false', (done) => {
      const store = mockStore();
      store.dispatch(handleExpandPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(false);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(false);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(false);
        done();
      }).catch(done.fail);
    });

    it('when loading homepage, should download homepage and its children', (done) => {
      const store = mockStore();
      getStatusMap.mockReturnValue({});
      store.dispatch(handleExpandPage('homepage')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
        done();
      }).catch(done.fail);
    });

    it('when loading an not expanded page (contacts) set page expanded to true', (done) => {
      const store = mockStore();
      store.dispatch(handleExpandPage('contacts')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });

  it('setViewPages should return correct object', () => {
    const payload = [{ test: 'view pages test' }];
    expect(setViewPages(payload)).toEqual({
      type: SET_VIEWPAGES,
      payload,
    });
  });

  it('setSearchPages should return correct object', () => {
    const payload = { pages: ['a', 'b'] };
    expect(setSearchPages(['a', 'b'])).toEqual({
      type: SEARCH_PAGES,
      payload,
    });
  });

  describe('fetchViewPages', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        apps: {
          cms: {
            pages: {
              viewPages: [],
              searchPages: [],
            },
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      store
        .dispatch(fetchViewPages())
        .then(() => {
          expect(getViewPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_VIEWPAGES);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getViewPages.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchViewPages())
        .then(() => {
          expect(getViewPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchSearchPages', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        apps: {
          cms: {
            pages: {
              viewPages: [],
              searchPages: [],
            },
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      store
        .dispatch(fetchSearchPages())
        .then(() => {
          expect(getSearchPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SEARCH_PAGES);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getSearchPages.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchSearchPages())
        .then(() => {
          expect(getSearchPages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });
});
