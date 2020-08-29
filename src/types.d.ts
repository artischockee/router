import React from 'react';
import { History } from 'history';

export declare namespace Router {
  // TODO: allow to pass numbers (so the result is: Record<string, string | number | string[] | number[]>)
  type SearchParams = Record<string, string | string[]>;

  interface InternalRouter {
    historyImplementation: History | null;
  }

  interface CreateRouterServiceParams {
    history: History | null;
  }

  type RouteComponent = React.LazyExoticComponent<any> | ((props: RouteComponentProps) => React.ReactElement);

  type Routes = Route[];

  interface Route {
    path: string;
    component: RouteComponent;
    settings: RouteSettings;
    componentSettings: ComponentSettings;
    subRoutes?: Route[];
  }

  // TODO: extend possible options; allow user to provide their own route settings
  interface RouteSettings {
    exact: boolean;
    isPrivate: boolean;
  }

  // TODO: extend possible options; allow user to provide their own component settings
  interface ComponentSettings {
    usePageWrapper: boolean;
    useHeader: boolean;
  }

  interface RouteComponentProps {
    subRoutes?: Route[];
  }
}
