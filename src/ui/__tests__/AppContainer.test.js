import { mapDispatchToProps } from 'ui/AppContainer';
import { setLanguage } from 'state/locale/actions';

const dispatchMock = jest.fn();

jest.mock('state/locale/actions', () => ({
  setLanguage: jest.fn(),
}));

describe('AppContainer', () => {
  it('maps dispatch property', () => {
    const props = mapDispatchToProps(dispatchMock);
    props.setupLanguage('oi');
    expect(dispatchMock).toHaveBeenCalled();
    expect(setLanguage).toHaveBeenCalledWith('oi');
  });
});
