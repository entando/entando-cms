import { configEnzymeAdapter } from 'testutils/helpers';

import { mapStateToProps } from 'ui/locale/IntlProviderContainer';
import { enLocale } from 'app-init/locale';

const TEST_STATE = { locale: 'en' };

configEnzymeAdapter();

describe('IntlProviderContainer', () => {
  it('maps locale property with state.locale', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ locale: 'en', messages: enLocale.messages });
  });
});
