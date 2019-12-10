import reducer from 'state/contents/reducer';
import {
  setQuickFilter, setContentType, setGroup, setSort,
  setContentCategoryFilter, checkStatus, checkAccess, setContents,
  checkAuthor, setCurrentAuthorShow, setCurrentStatusShow,
  setCurrentColumnsShow, selectRow, selectAllRows, setJoinContentCategory,
  resetJoinContentCategories,
  setTabSearch,
} from 'state/contents/actions';

const CONTENTS = [{ id: 1 }, { id: 2 }];

describe('state/contents/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_ASSETS', () => {
    let state;
    beforeEach(() => {
      state = reducer({});
    });

    describe('after action setQuickFilter', () => {
      let newState;
      it('should correctly update quick filter state field', () => {
        newState = reducer(state, setQuickFilter({ name: 'code', value: 'NEW2' }));
        expect(newState.currentQuickFilter).toEqual({ name: 'code', value: 'NEW2' });
      });
    });

    describe('after action setTabSearch', () => {
      let newState;
      it('should correctly update tabSearchEnabled state field', () => {
        newState = reducer(state, setTabSearch(true));
        expect(newState.tabSearchEnabled).toEqual(true);
      });
    });
    describe('after action setContents', () => {
      let newState;
      it('should correctly update contents state field', () => {
        newState = reducer(state, setContents());
        expect(newState.contents).toEqual([]);
      });
    });
    describe('after action setContentType', () => {
      let newState;
      it('should correctly update content type state field', () => {
        newState = reducer(state, setContentType('NEWS'));
        expect(newState.contentType).toEqual('NEWS');
      });
    });
    describe('after action setGroup', () => {
      let newState;
      it('should correctly update group state field', () => {
        newState = reducer(state, setGroup('free'));
        expect(newState.group).toEqual('free');
      });
    });
    describe('after action checkStatus', () => {
      let newState;
      it('should correctly update status field', () => {
        newState = reducer(state, checkStatus('approved'));
        expect(newState.statusChecked).toEqual('approved');

        newState = reducer(newState, checkStatus('approved'));
        expect(newState.statusChecked).toEqual('');
      });
    });
    describe('after action checkAccess', () => {
      let newState;
      it('should correctly update access field', () => {
        newState = reducer(state, checkAccess('open'));
        expect(newState.accessChecked).toEqual('open');

        newState = reducer(newState, checkAccess('open'));
        expect(newState.accessChecked).toEqual('');
      });
    });
    describe('after action checkAuthor', () => {
      let newState;
      it('should correctly update author field', () => {
        newState = reducer(state, checkAuthor('me'));
        expect(newState.authorChecked).toEqual('me');

        newState = reducer(newState, checkAuthor('me'));
        expect(newState.authorChecked).toEqual('');
      });
    });
    describe('after action setCurrentAuthorShow', () => {
      let newState;
      it('should correctly update current author show state field', () => {
        newState = reducer(state, setCurrentAuthorShow('me'));
        expect(newState.currentAuthorShow).toEqual('me');
      });
    });
    describe('after action setCurrentStatusShow', () => {
      let newState;
      it('should correctly update current status show state field', () => {
        newState = reducer(state, setCurrentStatusShow('approved'));
        expect(newState.currentStatusShow).toEqual('approved');
      });
    });
    describe('after action setSort', () => {
      let newState;
      it('should correctly update sort state field', () => {
        newState = reducer(state, setSort({ name: { direction: 'ASC', position: 0 } }));
        expect(newState.sortingColumns).toEqual({ name: { direction: 'ASC', position: 0 } });
      });
    });
    describe('after action selectRow', () => {
      let newState = reducer({ selectedRows: [] });
      it('should correctly update selectedRows state field', () => {
        newState = reducer(newState, selectRow({ id: 'new1' }));
        expect(newState.selectedRows).toEqual(['new1']);

        newState = reducer(newState, selectRow({ id: 'new1' }));
        expect(newState.selectedRows).toEqual([]);
      });
    });
    describe('after action selectAllRows', () => {
      let newState = reducer({ selectedRows: [] });
      it('should correctly update selectedRows field', () => {
        newState = reducer(newState, setContents(CONTENTS));
        newState = reducer(newState, selectAllRows(true));
        expect(newState.selectedRows.length).toEqual(2);
        newState = reducer(newState, selectAllRows(false));
        expect(newState.selectedRows.length).toEqual(0);
      });
    });
    describe('after action setCurrentColumnsShow', () => {
      let newState = reducer({ currentColumnsShow: [] });
      it('should correctly update currentColumnsShow state field', () => {
        newState = reducer(newState, setCurrentColumnsShow('column1'));
        expect(newState.currentColumnsShow).toEqual(['column1']);
        newState = reducer(newState, setCurrentColumnsShow('column1'));
        expect(newState.currentColumnsShow).toEqual([]);
        newState = reducer(newState, setCurrentColumnsShow('name'));
        expect(newState.currentColumnsShow).toEqual([]);
      });
    });
    describe('after action setContentCategoryFilter', () => {
      let newState = reducer({ filteringCategories: [] });
      it('should correctly update filteringCategories state field', () => {
        newState = reducer(newState, setContentCategoryFilter({ code: 'cat1' }));
        expect(newState.filteringCategories).toEqual([{ code: 'cat1' }]);
        newState = reducer(newState, setContentCategoryFilter({ code: 'cat1' }));
        expect(newState.filteringCategories).toEqual([]);
      });
    });
    describe('after action setJoinContentCategory', () => {
      let newState = reducer({ joiningCategories: [] });
      it('should correctly update joiningCategories state field', () => {
        newState = reducer(newState, setJoinContentCategory({ code: 'cat1' }));
        expect(newState.joiningCategories).toEqual([{ code: 'cat1' }]);
        newState = reducer(newState, setJoinContentCategory({ code: 'cat1' }));
        expect(newState.joiningCategories).toEqual([]);
      });
    });
    describe('after action resetJoinContentCategories', () => {
      let newState = reducer({ joiningCategories: ['a'] });
      it('should correctly update joiningCategories state field', () => {
        newState = reducer(newState, resetJoinContentCategories());
        expect(newState.joiningCategories).toEqual([]);
      });
    });
  });
});
