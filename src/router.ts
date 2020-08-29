import { getProcessedPath, getProcessedSearch } from './utils';
import { InternalRouter, SearchParams } from './types';

export const internalRouter: InternalRouter = {
  historyImplementation: null,
};

export function navigateTo(
  path: string,
  params?: Record<string, string | number> | null,
  searchParams?: SearchParams | null,
): void {
  const processedPath = getProcessedPath(path, params);
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
