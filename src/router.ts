import { Router as RouterTypes } from './types';
import { getProcessedPath, getProcessedSearch } from './utils';
import { Router } from './index';

function navigateTo(
  path: string,
  params?: Partial<RouterTypes.RouteParams>,
  searchParams?: RouterTypes.SearchParams,
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
  Router.historyImplementation?.back();
}

export default {
  navigateTo,
  appendSearchQuery,
  goBack,
}