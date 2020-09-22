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
  RouteComponent,
  RouteComponentProps,
  SearchParams,
  ToStringableObject,
} from './types';

export { getRouterNode, getRouterPaths } from './utils';

export { default, navigateTo, appendSearchQuery, goBack } from './router';
