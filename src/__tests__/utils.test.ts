import Utils, { getAllMatchesByRegExp, getRouterNode } from '../utils';
import { SearchParams } from '../types';

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
    let searchParams: SearchParams;
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

    it('should return correct string (without "?" mark in front) when one search param is presented and "withQuestionMark" set to "false"', () => {
      searchParams = { tab: 'competitions' };
      result = Utils.getProcessedSearch(searchParams, false);

      expect(result).toBe('tab=competitions');
    });
  });

  describe('getRouterNode()', () => {
    let result;

    it('should return correct object', () => {
      result = getRouterNode('/parent', {
        child1: '/child-1',
        child2: '/child-2',
      });

      expect(result).toStrictEqual({
        child1: '/parent/child-1',
        child2: '/parent/child-2',
        toString: expect.any(Function),
        valueOf: expect.any(Function),
      });

      expect(result.toString()).toBe('/parent');
      expect(result.valueOf()).toBe('/parent');
    });
  });

  describe('getAllMatchesByRegExp()', () => {
    it('should respect "g" flag of the regexp even if not provided', () => {
      const result = getAllMatchesByRegExp(/:([A-z]+)/, '/test/:myId/:myTest');

      expect(result).toStrictEqual([
        [':myId', 'myId'],
        [':myTest', 'myTest'],
      ]);
    });
  });
});
