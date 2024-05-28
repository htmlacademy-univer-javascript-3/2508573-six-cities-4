import { changeCity, citySlice } from './CitySlice';
import { address } from 'faker';

describe('City slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: address.city() };

    const result = citySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: 'Paris' };

    const result = citySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with \'changeCity\' action', () => {
    const initialState = { city: address.city() };
    const expectedState = { city: address.city() };

    const result = citySlice.reducer(initialState, changeCity(expectedState.city));

    expect(result).toStrictEqual(expectedState);
  });
});
