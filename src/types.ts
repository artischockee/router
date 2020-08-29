import React from 'react';
import { History } from 'history';

// TODO: allow to pass numbers (so the result is: Record<string, string | number | string[] | number[]>)
export type SearchParams = Record<string, string | string[]>;

export interface InternalRouter {
  historyImplementation: History | null;
}

export interface CreateRouterServiceParams {
  history: History | null;
}

export type RouteComponent = React.LazyExoticComponent<any> | ((props: RouteComponentProps) => React.ReactElement);

export type Routes = Route[];

export interface Route {
  path: string;
  component: RouteComponent;
  settings: RouteSettings;
  componentSettings: ComponentSettings;
  subRoutes?: Route[];
}

// TODO: extend possible options; allow user to provide their own route settings
export interface RouteSettings {
  exact: boolean;
  isPrivate: boolean;
}

// TODO: extend possible options; allow user to provide their own component settings
export interface ComponentSettings {
  usePageWrapper: boolean;
  useHeader: boolean;
}

export interface RouteComponentProps {
  subRoutes?: Route[];
}
