import { internalRouter } from './router';
import { CreateRouterServiceParams } from './types';

export function createRouterService(params: CreateRouterServiceParams): void {
  internalRouter.historyImplementation = params.history;
}

export {
  CreateRouterServiceParams,
  Routes,
  Route,
  BaseRoute,
  ComponentSettings,
  RouteComponent,
  RouteComponentProps,
  RouteSettings,
  SearchParams,
  ToStringableObject,
} from './types';

export { getRouterNode, getRouterPaths } from './utils';

export { default, navigateTo, appendSearchQuery, goBack } from './router';
