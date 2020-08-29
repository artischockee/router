import Router, { Router as InternalRouter } from './router';
import { CreateRouterServiceParams } from './types';

export function createRouterService(params: CreateRouterServiceParams): void {
  InternalRouter.historyImplementation = params.history;
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
export default Router;
