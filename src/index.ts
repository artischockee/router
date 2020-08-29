import { Router as RouterTypes } from './types';
import Router, { Router as InternalRouter } from './router';

export function createRouterService(params: RouterTypes.CreateRouterServiceParams): void {
  InternalRouter.historyImplementation = params.history;
}

export { RouterTypes };
export default Router;
