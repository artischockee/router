import { Router as RouterTypes } from './types';
import { getProcessedPath, getProcessedSearch } from './utils';

export const Router: RouterTypes.InternalRouter = {
  historyImplementation: null,
};

function navigateTo(
  path: string,
  params?: Record<string, string | number> | null,
  searchParams?: RouterTypes.SearchParams | null,
): void {
  const processedPath = getProcessedPath(path, params);
  const processedSearch = getProcessedSearch(searchParams);

  Router.historyImplementation?.push({
    pathname: processedPath,
    search: processedSearch,
  });
}

function appendSearchQuery(searchParams: RouterTypes.SearchParams): void {
  const processedSearch = getProcessedSearch(searchParams);

  Router.historyImplementation?.push({ search: processedSearch });
}

function goBack(): void {
  Router.historyImplementation?.goBack();
}

export default {
  navigateTo,
  appendSearchQuery,
  goBack,
}