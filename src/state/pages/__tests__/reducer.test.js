import reducer from 'state/pages/reducer';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD,
  ERROR_PAYLOAD, LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
} from 'testutils/mocks/pages';

import {
  addPages, togglePageExpanded, setPageLoading,
  setPageLoaded, setViewPages,
} from 'state/pages/actions';

const PAGES = [
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
];

describe('state/pages/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('childrenMap', {});
    expect(state).toHaveProperty('titlesMap', {});
    expect(state).toHaveProperty('statusMap', {});
    expect(state).toHaveProperty('viewPages', []);
  });

  describe('after action ADD_PAGES', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addPages(PAGES));
    });

    it('should define the pages map', () => {
      expect(state.map).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.map[page.code]).toBeDefined();
      });
    });

    it('should define the childrenMap', () => {
      expect(state.childrenMap).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.childrenMap[page.code]).toBeDefined();
      });
    });

    it('should define the titlesMap', () => {
      expect(state.titlesMap).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.titlesMap[page.code]).toBeDefined();
      });
    });

    describe('action TOGGLE_PAGE_EXPANDED', () => {
      let newState;
      const PAGE_CODE = 'homepage';
      it('should toggle the page expanded flag', () => {
        newState = reducer(state, togglePageExpanded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(true);

        newState = reducer(newState, togglePageExpanded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(false);
      });
    });

    describe('action SET_PAGE_LOADING', () => {
      let newState;
      const PAGE_CODE = 'homepage';
      it('sets the page loading flag to true', () => {
        newState = reducer(state, setPageLoading(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loading).toBe(true);
      });
    });

    describe('action SET_PAGE_LOADED', () => {
      let newState;
      const PAGE_CODE = 'homepage';
      it('sets the page loaded flag to true', () => {
        newState = reducer(state, setPageLoaded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loaded).toBe(true);
      });
      it('sets the page loading flag to false', () => {
        newState = reducer(state, setPageLoaded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loading).toBe(false);
      });
    });
  });

  it('should return correct state with setViewPages action', () => {
    const state = reducer();
    const payload = [{ test: 'test' }];
    const action = setViewPages(payload);
    expect(reducer(state, action)).toEqual({
      ...state,
      viewPages: payload,
    });
  });
});
