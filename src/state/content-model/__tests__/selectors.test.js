import { getContentModelList } from 'state/content-model/selectors';

const TEST_STATE = { contentModel: { list: ['hello', 'world'] } };

it('verify getContentModelList selector', () => {
  const state = getContentModelList(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toHaveLength(2);
});
