import {
  getContentModelList,
  getContentModelOpened,
  getContentModelFilterProps,
  getContentModelSearchAttribute,
  getContentModelSearchKeyword,
  getContentModelDictionaryList,
} from 'state/content-model/selectors';

const TEST_STATE = {
  apps: {
    cms: {
      contentModel: {
        list: ['hello', 'world'],
        opened: { name: 'ciao', id: 1 },
        filters: {
          filterProps: {
            formValues: { descr: 'boger' },
            operators: { descr: 'like' },
          },
          attribute: 'descr',
          keyword: 'woo',
        },
        dictionary: {
          list: [
            {
              code: 'content',
              methods: { getId: null },
            },
            {
              code: 'lecode',
              methods: null,
            },
          ],
          map: { content: { getId: null } },
        },
      },
    },
  },
};

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

it('verify getContentModelSearchKeyword selector', () => {
  const keyword = getContentModelSearchKeyword(TEST_STATE);
  expect(keyword).toBeDefined();
  expect(keyword).toEqual(TEST_STATE.apps.cms.contentModel.filters.keyword);
});

it('verify getContentModelSearchAttribute selector', () => {
  const attribute = getContentModelSearchAttribute(TEST_STATE);
  expect(attribute).toBeDefined();
  expect(attribute).toEqual(TEST_STATE.apps.cms.contentModel.filters.attribute);
});

it('verify getContentModelFilterProps selector', () => {
  const filtProps = getContentModelFilterProps(TEST_STATE);
  expect(filtProps).toBeDefined();
  expect(filtProps).toEqual(TEST_STATE.apps.cms.contentModel.filters.filterProps);
});

it('verify getContentModelDictionaryList selector', () => {
  const filtProps = getContentModelDictionaryList(TEST_STATE);
  expect(filtProps).toBeDefined();
  expect(filtProps).toEqual(TEST_STATE.apps.cms.contentModel.dictionary.list);
});
