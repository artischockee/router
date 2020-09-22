import React from 'react';
import { History } from 'history';

// TODO: allow to pass numbers (so the result is: Record<string, string | number | string[] | number[]>)
export type SearchParams = Record<string, string | string[]>;

export interface InternalRouter {
  historyImplementation: History | null;
}

/**
 * An object like
 *
 * {
 *   path1: '/path1',
 *   pathComplex: {
 *     subPath1: '/sub-path-1',
 *     subPath2: '/sub-path-2'
 *   },
 *   ..,
 *   toString() {
 *     return BaseURL;
 *   }
 * }
 *
 * where 'BaseURL' is the 1st argument of getRouterNode() utility.
 * The objects of type ToStringableObject are being created by getRouterNode() function.
 * You do not want to use this type explicitly.
 */
export type ToStringableObject<BaseURL = string, Paths = Record<string, string>> = {
  toString(): BaseURL;
} & Paths;

export interface CreateRouterServiceParams {
  history: History | null;
}

export type RouteComponent<RS, CS> =
  | React.LazyExoticComponent<any>
  | ((props: RouteComponentProps<RS, CS>) => React.ReactElement);

export type Routes<RS, CS> = Route<RS, CS>[];

export type RoutesDirty<RS, CS> = RouteDirty<RS, CS>[];

export interface BaseRoute<RouteSettings = Record<string, any>, ComponentSettings = Record<string, any>> {
  component: RouteComponent<RouteSettings, ComponentSettings>;
  settings: RouteSettings;
  componentSettings: ComponentSettings;
}

export interface Route<RS, CS> extends BaseRoute<RS, CS> {
  path: string;
  subRoutes?: Route<RS, CS>[];
}

export interface RouteDirty<RS, CS> extends BaseRoute<RS, CS> {
  path: string | ToStringableObject;
  subRoutes?: RouteDirty<RS, CS>[];
}

export interface RouteComponentProps<RS, CS> {
  subRoutes?: Route<RS, CS>[];
}
