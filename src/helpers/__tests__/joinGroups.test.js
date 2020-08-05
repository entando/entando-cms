import { parseJoinGroups } from 'helpers/joinGroups';

const JOIN_GROUPS = ['sampleGroup'];
const EMPTY_ARRAY = [];

describe('helpers/joinGroups', () => {
  it('array input', () => {
    expect(parseJoinGroups(JOIN_GROUPS)).toEqual(JOIN_GROUPS);
  });

  it('stringified array input', () => {
    expect(parseJoinGroups('["sampleGroup"]')).toEqual(JOIN_GROUPS);
  });

  it('empty stringified array input', () => {
    expect(parseJoinGroups('[]')).toEqual(EMPTY_ARRAY);
  });

  it('empty string input', () => {
    expect(parseJoinGroups('')).toEqual(EMPTY_ARRAY);
  });

  it('empty array input', () => {
    expect(parseJoinGroups([])).toEqual(EMPTY_ARRAY);
  });

  it('null input', () => {
    expect(parseJoinGroups(null)).toEqual(EMPTY_ARRAY);
  });

  it('undefined input', () => {
    expect(parseJoinGroups(undefined)).toEqual(EMPTY_ARRAY);
  });

  it('empty object input', () => {
    expect(parseJoinGroups({})).toEqual(EMPTY_ARRAY);
  });

  it('object input', () => {
    expect(parseJoinGroups({ a: 'a', b: 'b' })).toEqual(EMPTY_ARRAY);
  });
});
