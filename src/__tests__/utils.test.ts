import Utils from '../utils';
import { Router } from '../types';

describe('utils', () => {
  describe('getProcessedPath()', () => {
    let path: string;
    let result: string;

    it('should return correct string without any params', () => {
      path = '/profile/competition';
      result = Utils.getProcessedPath(path);

      expect(result).toBe(path);
    });

    it('should return correct string with one param', () => {
      path = '/profile/competition/:competitionId';
      result = Utils.getProcessedPath(path, {
        competitionId: '123',
      });

      expect(result).toBe('/profile/competition/123');
    });

    it('should return correct string with multiple params', () => {
      path = '/profile/competition/:competitionId/athlete/:athleteId';
      result = Utils.getProcessedPath(path, { competitionId: '123', athleteId: '456' });

      expect(result).toBe('/profile/competition/123/athlete/456');
    });

    it('should ignore passed params when the path is plain', () => {
      path = '/profile/settings';
      result = Utils.getProcessedPath(path, { competitionId: '123' });

      expect(result).toBe(path);
    });
  });

  describe('getProcessedSearch()', () => {
    let searchParams: Router.SearchParams;
    let result: string;

    it('should return empty string when there is no search params', () => {
      searchParams = {};
      result = Utils.getProcessedSearch(searchParams);

      expect(result).toBe('');
    });

    it('should return empty string when searchParams is undefined', () => {
      result = Utils.getProcessedSearch(undefined);

      expect(result).toBe('');
    });

    it('should return correct string when one search param is presented', () => {
      searchParams = { tab: 'competitions' };
      result = Utils.getProcessedSearch(searchParams);

      expect(result).toBe('?tab=competitions');
    });

    it('should return correct string when multiple search params are presented', () => {
      searchParams = { tab: 'competitions', foo: 'bar', baz: 'falsy' };
      result = Utils.getProcessedSearch(searchParams);

      expect(result).toBe('?tab=competitions&foo=bar&baz=falsy');
    });

    it('should return correct string when multiple search params are presented and some params are being repeated', () => {
      searchParams = { tab: 'competitions', foo: ['bar', 'also-bar'], baz: 'falsy' };
      result = Utils.getProcessedSearch(searchParams);

      expect(result).toBe('?tab=competitions&foo=bar&foo=also-bar&baz=falsy');
    });
  });
});
