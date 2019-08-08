import { configEnzymeAdapter } from 'testutils/helpers';

import { mapStateToProps, mapDispatchToProps } from 'ui/toast/ToastsContainer';

configEnzymeAdapter();

const mockToasts = {
  a: {
    message: 'whatever',
    type: 'success',
  },
};

jest.mock('@entando/messages', () => ({
  getToasts: jest.fn(() => mockToasts),
}));

describe('ToastsContainer', () => {
  it('maps the toasts property', () => {
    expect(mapStateToProps({})).toEqual({
      toasts: mockToasts,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onDismiss', expect.any(Function));
    });
  });
});
