import { internalRouter } from './router';
import { CreateRouterServiceParams } from './types';

export function createRouterService(params: CreateRouterServiceParams): void {
  internalRouter.historyImplementation = params.history;
}

export {
  CreateRouterServiceParams,
  Routes,
  Route,
  ComponentSettings,
  RouteComponent,
  RouteComponentProps,
  RouteSettings,
  SearchParams,
} from './types';

export { default, navigateTo, appendSearchQuery, goBack } from './router';
