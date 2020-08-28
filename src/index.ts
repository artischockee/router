import { Router as RouterTypes } from './types';

export const Router: RouterTypes.InternalRouter = {
  historyImplementation: null,
};

export function createRouterService(params: RouterTypes.CreateRouterServiceParams): void {
  Router.historyImplementation = params.history;
}

export type Routes = RouterTypes.Routes;

export { default } from './router';
