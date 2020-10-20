import reducer from 'state/app-tour/reducer';
import {
  setAppTourProgress, setAppTourLastStep,
  setTourCreatedPage, clearAppTourProgress, setPublishStatus,
} from 'state/app-tour/actions';
import {
  getAppTourProgress, getAppTourlastStep,
  getTourCreatedPage, getPublishStatus,
} from 'state/app-tour/selectors';

describe('state/permssions/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an object', () => {
      expect(typeof state).toBe('object');
    });
  });

  describe('after action setAppTourProgress', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourProgress('started'));
    });

    it('should define the progress payload', () => {
      expect(getAppTourProgress({ appTour: newState })).toEqual('started');
    });
  });

  describe('after action setAppTourLastStep', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourLastStep(10));
    });

    it('should define the last step payload', () => {
      expect(getAppTourlastStep({ appTour: newState })).toEqual(10);
    });
  });

  describe('after action setTourCreatedPage', () => {
    let newState;
    const page = { code: 'test' };
    beforeEach(() => {
      newState = reducer(state, setTourCreatedPage(page));
    });

    it('should define the page payload', () => {
      expect(getTourCreatedPage({ appTour: newState })).toEqual(page);
    });
  });

  describe('after action setPublishStatus', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPublishStatus('published'));
    });

    it('should define the publish status payload', () => {
      expect(getPublishStatus({ appTour: newState })).toEqual('published');
    });
  });

  describe('after action clearAppTourProgress', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourLastStep(10));
      newState = reducer(newState, clearAppTourProgress());
    });

    it('should define the publish status payload', () => {
      expect(getAppTourProgress({ appTour: newState })).toEqual(undefined);
      expect(getAppTourlastStep({ appTour: newState })).toEqual(undefined);
    });
  });
});
