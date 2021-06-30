import { get } from 'lodash';

export const adminConsoleUrl = url => `${get(process.env, 'REACT_APP_DOMAIN', '')}/${url}`;

export const hasURLProtocol = url => /^(\/|(http(s)?\:)?\/\/)/i.test(url);
