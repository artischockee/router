import { getProcessedPath, getProcessedSearch } from './utils';
import { InternalRouter, SearchParams } from './types';

export const Router: InternalRouter = {
  historyImplementation: null,
};

function navigateTo(
  path: string,
  params?: Record<string, string | number> | null,
  searchParams?: SearchParams | null,
): void {
  const processedPath = getProcessedPath(path, params);
  const processedSearch = getProcessedSearch(searchParams);

  Router.historyImplementation?.push({
    pathname: processedPath,
    search: processedSearch,
  });
}

function appendSearchQuery(searchParams: SearchParams): void {
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
};
