import { getProcessedPath, getProcessedSearch } from './utils';
import { InternalRouter, SearchParams, ToStringableObject } from './types';

export const internalRouter: InternalRouter = {
  historyImplementation: null,
};

export function navigateTo<BaseURL extends string, Paths extends Record<string, string>>(
  path: string | ToStringableObject<BaseURL, Paths>,
  params?: Record<string, string | number> | null,
  searchParams?: SearchParams | null,
): void {
  const processedPath = getProcessedPath(path.toString(), params);
  const processedSearch = getProcessedSearch(searchParams);

  internalRouter.historyImplementation?.push({
    pathname: processedPath,
    search: processedSearch,
  });
}

export function appendSearchQuery(searchParams: SearchParams): void {
  const processedSearch = getProcessedSearch(searchParams);

  internalRouter.historyImplementation?.push({ search: processedSearch });
}

export function goBack(): void {
  internalRouter.historyImplementation?.goBack();
}

const Router = {
  navigateTo,
  appendSearchQuery,
  goBack,
};

export default Router;
