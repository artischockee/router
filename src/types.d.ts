import React from 'react';
import { History } from 'history';

export declare namespace Router {
  type SearchParams = Record<string, string | string[]>;

  interface InternalRouter {
    historyImplementation: History | null,
  }

  interface CreateRouterServiceParams {
    history: History | null;
  }

  type RouteComponent =
    | React.LazyExoticComponent<any>
    | ((props: RouteComponentProps) => React.ReactElement);

  type Routes = Route[];

  interface Route {
    path: string;
    component: RouteComponent;
    settings: RouteSettings;
    componentSettings: ComponentSettings;
    subRoutes?: Route[];
  }

  interface RouteSettings {
    exact: boolean;
    isPrivate: boolean;
  }

  interface ComponentSettings {
    usePageWrapper: boolean;
    useHeader: boolean;
  }

  type RouteParams = Record<string, any>;

  interface RouteComponentProps {
    subRoutes?: Route[];
  }
}
