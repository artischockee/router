import React from 'react';
import { createBrowserHistory } from 'history';
import Router, { createRouterService } from '../index';
import { getRouterNode } from '../utils';

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

  describe('navigateTo() with "toStringable" object as a path', () => {
    const path = {
      indexPage: "/",
      employerPage: getRouterNode("/employer", {
        recruitmentStepsSection: "/recruitment-steps",
      }),
      page404: "*",
    };

    it('should navigate to the specified core path', () => {
      Router.navigateTo(path.employerPage);

      expect(global.window.location.pathname).toEqual('/employer');
    });

    it('should navigate to the specified sub route path', () => {
      Router.navigateTo(path.employerPage.recruitmentStepsSection);

      expect(global.window.location.pathname).toEqual('/employer/recruitment-steps');
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
