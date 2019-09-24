import {
  getContentModelList,
  getContentModelOpened,
} from 'state/content-model/selectors';

const TEST_STATE = { contentModel: { list: ['hello', 'world'], opened: { name: 'ciao', id: 1 } } };

it('verify getContentModelList selector', () => {
  const state = getContentModelList(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toHaveLength(2);
});

it('verify getContentModelOpened selector', () => {
  const opened = getContentModelOpened(TEST_STATE);
  expect(opened).toBeDefined();
  expect(opened).toHaveProperty('name', 'ciao');
  expect(opened).toHaveProperty('id', 1);
});
