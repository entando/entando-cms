import { addLocaleData } from 'react-intl';
import { enLocale, itLocale } from 'app-init/locale';

jest.mock('react-intl', () => ({
  addLocaleData: jest.fn(),
}));

describe('app-init/locale', () => {
  it('calls addLocaleData', () => {
    expect(addLocaleData).toBeCalled();
    expect(itLocale).toBeDefined();
    expect(enLocale).toBeDefined();
  });
});
