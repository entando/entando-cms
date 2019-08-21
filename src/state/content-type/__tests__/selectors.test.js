import { getContentTypeList } from 'state/content-type/selectors';

const TEST_STATE = { contentType: { list: ['hello', 'world'] } };

it('verify getContentTypeList selector', () => {
  const state = getContentTypeList(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toHaveLength(2);
});
