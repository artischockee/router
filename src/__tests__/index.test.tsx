import React from 'react';
import { createBrowserHistory } from 'history';
import Router, { createRouterService } from '../index';

describe('Router', () => {
  beforeAll(() => {
    createRouterService({
      history: createBrowserHistory(),
    });
  });

  afterEach(() => {
    Router.navigateTo('/'); // that's funny
  });

  describe('navigateTo()', () => {
    it('should navigate to the specified path', () => {
      Router.navigateTo('/example');

      expect(global.window.location.pathname).toEqual('/example');
    });

    it('should navigate to the specified path with params', () => {
      Router.navigateTo('/example/:param', {
        param: 'foobar',
      });

      expect(global.window.location.pathname).toEqual('/example/foobar');
    });

    it('should navigate to the specified path with params and query params', () => {
      Router.navigateTo(
        '/example/:param',
        {
          param: 'foobar',
        },
        {
          filter: 'true',
          bar: ['baz', 'bax'],
        },
      );

      expect(global.window.location.pathname).toEqual('/example/foobar');
      expect(global.window.location.search).toEqual('?filter=true&bar=baz&bar=bax');
    });

    it('should navigate to the specified path without params (null) but with query params', () => {
      Router.navigateTo('/example', null, {
        filter: 'true',
        bar: ['baz', 'bax'],
      });

      expect(global.window.location.pathname).toEqual('/example');
      expect(global.window.location.search).toEqual('?filter=true&bar=baz&bar=bax');
    });

    it('should navigate to the specified path without params (empty object) but with query params', () => {
      Router.navigateTo(
        '/example',
        {},
        {
          filter: 'true',
          bar: ['baz', 'bax'],
        },
      );

      expect(global.window.location.pathname).toEqual('/example');
      expect(global.window.location.search).toEqual('?filter=true&bar=baz&bar=bax');
    });
  });

  describe('appendSearchQuery()', () => {
    it('should append search params to the URL', () => {
      Router.appendSearchQuery({
        filter: 'true',
        bar: ['baz', 'bax'],
      });

      expect(global.window.location.pathname).toEqual('/');
      expect(global.window.location.search).toEqual('?filter=true&bar=baz&bar=bax');
    });
  });
});
