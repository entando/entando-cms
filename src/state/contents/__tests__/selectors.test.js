import {
  getContents,
  getCurrentQuickFilter,
  getFilteringCategories,
  getStatusChecked,
  getAccessChecked,
  getAuthorChecked,
  getCurrentAuthorShow,
  getCurrentStatusShow,
  getCurrentColumnsShow,
  getSortingColumns,
  getSelectedRows,
  getJoiningCategories,
} from 'state/contents/selectors';

const TEST_STATE = {
  apps: {
    cms: {
      contents: {
        sortingColumns: { name: { direction: 'ASC', position: 0 } },
        contents: ['a', 'b'],
        currentQuickFilter: { name: 'code', value: 'new2' },
        filteringCategories: [{ code: 'a' }],
        joiningCategories: [{ code: 'a' }],
        contentType: 'NEWS',
        group: 'free',
        statusChecked: 'approved',
        authorChecked: 'me',
        accessChecked: 'open',
        currentAuthorShow: 'me',
        currentStatusShow: 'approved',
        selectedRows: ['row1', 'row2'],
        currentColumnsShow: ['col1', 'col2'],
      },
    },
  },
};

it('verify getContents selector', () => {
  const contents = getContents(TEST_STATE);
  expect(contents).toEqual(['a', 'b']);
});

it('verify getCurrentQuickFilter selector', () => {
  const currentFilter = getCurrentQuickFilter(TEST_STATE);
  expect(currentFilter).toEqual({ name: 'code', value: 'new2' });
});

it('verify getFilteringCategories selector', () => {
  const filteringCategories = getFilteringCategories(TEST_STATE);
  expect(filteringCategories).toEqual([{ code: 'a' }]);
});

it('verify getJoiningCategories selector', () => {
  const joiningCategories = getJoiningCategories(TEST_STATE);
  expect(joiningCategories).toEqual([{ code: 'a' }]);
});

it('verify getStatusChecked selector', () => {
  const status = getStatusChecked(TEST_STATE);
  expect(status).toEqual('approved');
});

it('verify getAccessChecked selector', () => {
  const access = getAccessChecked(TEST_STATE);
  expect(access).toEqual('open');
});

it('verify getAuthorChecked selector', () => {
  const author = getAuthorChecked(TEST_STATE);
  expect(author).toEqual('me');
});

it('verify getCurrentAuthorShow selector', () => {
  const author = getCurrentAuthorShow(TEST_STATE);
  expect(author).toEqual('me');
});

it('verify getCurrentStatusShow selector', () => {
  const status = getCurrentStatusShow(TEST_STATE);
  expect(status).toEqual('approved');
});

it('verify getCurrentColumnsShow selector', () => {
  const currentColumns = getCurrentColumnsShow(TEST_STATE);
  expect(currentColumns).toEqual(['col1', 'col2']);
});

it('verify getSortingColumns selector', () => {
  const sort = getSortingColumns(TEST_STATE);
  expect(sort).toEqual({ name: { direction: 'ASC', position: 0 } });
});

it('verify getSortingColumns selector', () => {
  const sort = getSortingColumns(TEST_STATE);
  expect(sort).toEqual({ name: { direction: 'ASC', position: 0 } });
});

it('verify getSelectedRows selector', () => {
  const selectedRows = getSelectedRows(TEST_STATE);
  expect(selectedRows).toEqual(['row1', 'row2']);
});
