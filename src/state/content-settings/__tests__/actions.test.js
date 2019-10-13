import { createMockStore, mockApi } from 'testutils/helpers';
import {
  setContentSettings,
  setEditorSettings,
  fetchContentSettings,
  sendPostReloadReferences,
  sendPostReloadIndexes,
  sendPutEditorSettings,
  addCropRatio,
  removeCropRatio,
} from 'state/content-settings/actions';
import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_CROP_RATIOS,
} from 'state/content-settings/types';
import { getCropRatios } from 'state/content-settings/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';
import {
  CONTENT_SETTINGS_OK,
} from 'testutils/mocks/contentSettings';

import {
  getContentSettings,
  postReloadReferences,
  postReloadIndexes,
  putEditorSettings,
  postCropRatio,
  deleteCropRatio,
} from 'api/contentSettings';

const contSettings = CONTENT_SETTINGS_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_SETTINGS,
  payload: contSettings,
};

jest.mock('api/contentSettings', () => ({
  getContentSettings: jest.fn(mockApi({
    payload: {
      indexesLastReload: {
        date: 1569393692905,
        result: 1,
      },
      indexesStatus: 0,
      referencesStatus: 0,
      metadata: {
        legend: [],
        alt: [],
        description: [],
        title: [],
      },
      cropRatios: [
        '4:9',
      ],
      editor: {
        label: 'CKEditor',
        key: 'fckeditor',
      },
    },
  })),
  postReloadReferences: jest.fn(mockApi({ payload: '' })),
  postReloadIndexes: jest.fn(mockApi({ payload: '' })),
  putEditorSettings: jest.fn(key => mockApi({ payload: key })()),
  postCropRatio: jest.fn(mockApi({})),
  deleteCropRatio: jest.fn(mockApi({})),
}));

jest.mock('state/content-settings/selectors', () => ({
  getCropRatios: jest.fn(() => ['4:9']),
}));

it('test setContentSettings action', () => {
  expect(setContentSettings(contSettings)).toEqual(CONTMODEL_SET_PARAMS);
});

it('test setEditorSettings action', () => {
  const payload = { key: 'ao' };
  expect(setEditorSettings(payload)).toEqual({
    type: SET_EDITOR_SETTINGS,
    payload,
  });
});

describe('contentSettings thunks', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({ settings: {} });
  });
  it('fetchContentSettings', (done) => {
    store.dispatch(fetchContentSettings()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[0].payload.id).toEqual('getSettings');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_SETTINGS);
      expect(actions[1]).toHaveProperty('payload');
      expect(actions[1].payload).toEqual(contSettings);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('getSettings');
      done();
    }).catch(done.fail);
  });

  it('fetchContentSettings error', (done) => {
    getContentSettings.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentSettings()).then(() => {
      expect(getContentSettings).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
      expect(actions[3]).toHaveProperty('type', 'errors/clear-errors');
      expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('sendPostReloadReferences', (done) => {
    store.dispatch(sendPostReloadReferences()).then(() => {
      expect(postReloadReferences).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('sendPostReloadReferences error', (done) => {
    postReloadReferences.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(sendPostReloadReferences()).then(() => {
      expect(postReloadReferences).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
      expect(actions[3]).toHaveProperty('type', 'errors/clear-errors');
      expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('sendPostReloadIndexes', (done) => {
    store.dispatch(sendPostReloadIndexes()).then(() => {
      expect(postReloadIndexes).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1].payload.id).toEqual('reloadIndexes');
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('getSettings');
      done();
    }).catch(done.fail);
  });

  it('sendPostReloadIndexes error', (done) => {
    postReloadIndexes.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(sendPostReloadIndexes()).then(() => {
      expect(postReloadIndexes).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[3]).toHaveProperty('type', 'toasts/add-toast');
      expect(actions[4]).toHaveProperty('type', 'errors/clear-errors');
      done();
    }).catch(done.fail);
  });

  it('sendPutEditorSettings', (done) => {
    const tosend = { key: 'yatch' };
    store.dispatch(sendPutEditorSettings(tosend)).then((res) => {
      expect(putEditorSettings).toHaveBeenCalledWith(tosend);
      expect(res).toHaveProperty('payload', tosend);
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', SET_EDITOR_SETTINGS);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('sendPutEditorSettings error', (done) => {
    putEditorSettings.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { key: 'yatch' };
    store.dispatch(sendPutEditorSettings(tosend)).then((res) => {
      expect(putEditorSettings).toHaveBeenCalledWith(tosend);
      expect(res).toEqual(undefined);
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('addCropRatio', (done) => {
    const params = { ratio: '4:9' };
    store.dispatch(addCropRatio(params.ratio)).then(() => {
      expect(postCropRatio).toHaveBeenCalledWith(params);
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', SET_CROP_RATIOS);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('addCropRatio error', (done) => {
    postCropRatio.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(addCropRatio()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('removeCropRatio', (done) => {
    const params = { ratio: '4:9' };
    store.dispatch(removeCropRatio(params.ratio)).then(() => {
      expect(deleteCropRatio).toHaveBeenCalledWith(params);
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', SET_CROP_RATIOS);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('removeCropRatio error', (done) => {
    deleteCropRatio.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(removeCropRatio()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });
});
