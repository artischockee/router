# Router

[![Codecov Coverage](https://img.shields.io/codecov/c/github/artischockee/router/master.svg?style=flat-square)](https://codecov.io/gh/artischockee/router/)
[![NPM version](https://img.shields.io/npm/v/@artischocke/router?style=flat-square)](https://www.npmjs.com/package/@artischocke/router)
![Minified size](https://img.shields.io/bundlephobia/min/@artischocke/router?style=flat-square)

The library at the moment uses [history](https://www.npmjs.com/package/history) package of version `4.10.1`, because it is assumed that the [react-router-dom](https://www.npmjs.com/package/react-router-dom) library version is `5` (I won't work with version `6` until it releases from beta state).

## Install

```
npm install @artischocke/router
```

or, using Yarn:

```
yarn add @artischocke/router
```

## Usage

Initial setup (using `createRouterService`):

```typescript
// router.ts

import { createRouterService } from '@artischocke/router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

createRouterService({
  history,
});

export default history;
```

Router paths configuration:

```typescript
// routerPaths.ts

import { getRouterNode } from '@artischocke/router';

const RouterPaths = {
  indexPage: '/',
  employerPage: getRouterNode('/employer', {
    tariffsSection: '/tariffs',
    vacanciesSection: '/vacancies',
  }),
  page404: '*',
};

// getRouterNode() returns an object with injected toString() and valueOf().
// This helps the methods like navigateTo() transform the passed object to string
// and receive expected value (like '/employer' in this case).
//
// However, if you use this 'toStringable' object elsewhere
// (where no '.toString()' transformations exist), you must
// call '.toString()' explicitly:
//
// console.log(RouterPaths.employerPage.toString());
//  -> '/employer'
// console.log(RouterPaths.employerPage.tariffsSection);
//  -> '/employer/tariffs'

export default RouterPaths;
```

Routes configuration:

```typescript
// config.ts

import { lazy } from 'react';
import { getRouterPaths } from '@artischocke/router';
import RouterPaths from './routerPaths';

const IndexPage = lazy(() => import('../pages/indexPage'));
const EmployerPage = lazy(() => import('../pages/employerPage'));
const Page404 = lazy(() => import('../pages/page404'));

// You can provide your optional interfaces
// both for 'settings' entry (called 'RouteSettings')
// and for 'componentSettings' one (called 'ComponentSettings'):

interface RS {
    exact: boolean;
    isPrivate: boolean;
}

interface CS {
    usePageWrapper: boolean;
    useHeader: boolean;
}

// Later on, use the interfaces from above in 'getRouterPaths' call signature
// (they will help IDE to autocomplete entries in these objects):

const Routes = getRouterPaths<RS, CS>([
  {
    path: RouterPaths.indexPage,
    component: IndexPage,
    settings: { exact: true, isPrivate: false },
    componentSettings: {
      usePageWrapper: true,
      useHeader: true,
    },
  },
  {
    path: RouterPaths.employerPage,
    component: EmployerPage,
    settings: { exact: false, isPrivate: false },
    componentSettings: {
      usePageWrapper: true,
      useHeader: true,
    },
    subRoutes: [
      {
        path: RouterPaths.employerPage.tariffsSection,
        component: /* another lazy loaded component */,
        settings: { exact: true, isPrivate: true },
        componentSettings: {
          usePageWrapper: false,
          useHeader: false,
        },
      },
      {
        path: RouterPaths.employerPage.vacanciesSection,
        component: /* another lazy loaded component */,
        settings: { exact: true, isPrivate: true },
        componentSettings: {
          usePageWrapper: false,
          useHeader: false,
        },
      },
    ],
  },
  {
    path: RouterPaths.page404,
    component: Page404,
    settings: { exact: false, isPrivate: false },
    componentSettings: {
      usePageWrapper: true,
      useHeader: true,
    },
  },
]);

export default Routes;
```

```tsx
// Root.tsx

import React from 'react';
import { Router, Route as ReactRouterRoute, Switch } from 'react-router-dom';
import history from './router';
import Routes from './config';

export default function Root() {
  return (
    <Router history={history}>
      <Switch>
        {props.routes.map((route) => {
          const Route = route.settings.isPrivate
            ? PrivateRoute // use your own component with the logic you need
            : ReactRouterRoute; // use default <Route /> component from 'react-router-dom'

          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.settings.exact}
              render={() => (
                // use your own component to build the UI
                <LayoutBuilder
                  component={route.component}
                  subRoutes={route.subRoutes}
                  componentSettings={route.componentSettings}
                />
              )}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
```

Somewhere outside of React components, where you can't access `react-router-dom`'s hooks, and therefore are not allowed to use them:

```typescript
// ComponentUtils.ts

import Router from '@artischocke/router';

export function handleRedirectToFancyPage(params: Record<string, string | number>) {
  Router.navigateTo(
    // pathname you want the Router redirect to
    '/fancy-page/:fancyId',
    // if you have some ':variable' in your pathname, then specify
    // these parameters here, otherwise - pass null or empty object
    { fancyId: 123 },
    // search query with either individual or multiple params;
    // you can omit this parameter as well as the second one (or pass null instead)
    { searchQuery: 'foo', pages: ['1', '2'] },
  );

  // The result of the URL will be:
  // '/fancy-page/123?searchQuery=foo&pages=1&pages=2'
}
```

## API Reference

_<to-do>_

## To-do list

- [ ] Write meaningful description
- [ ] Write API reference
- [ ] Extend possible options in `Route.settings` and `Route.componentSettings` configurations
- [ ] Adding own route settings
- [ ] Adding own component settings
- [ ] Custom variable pattern (not only `/:([A-z]+)/g` pattern)

## Issues

If you find any bugs and other issues when using this library, please let me know about this. Report issues in the specified section.
