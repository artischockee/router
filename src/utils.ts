import { SearchParams, ToStringableObject, Routes, RoutesDirty } from './types';

/**
 * Processes specified page with format like '/:id', where 'id' is a
 * URL parameter that must be replaced with real value taken from 'params'
 */
export function getProcessedPath(path: string, params?: Record<string, string | number> | null): string {
  if (params == null) return path;

  // TODO: allow custom regExp
  const regExp = /:([A-z]+)/g;

  const matches = getAllMatchesByRegExp(regExp, path);

  if (matches.length === 0) return path;

  let formattedPath = path;

  matches.forEach((match) => {
    formattedPath = formattedPath.replace(match[0], params[match[1]].toString());
  });

  return formattedPath;
}

/**
 * Processes search params and returns a stringified version of URLSearchParams.
 *
 * Examples:
 *
 * ({ foo: 'bar' }) => 'foo=bar'
 * ({ foo: ['bar', 'baz'] }) => 'foo=bar&foo=baz'
 * ({ foo: 'bar', baz: ['oof', 'ofo'], bra: 'bra-bra' }) => 'foo=bar&baz=oof&baz=ofo&bra=bra-bra'
 */
export function getProcessedSearch(searchParams?: SearchParams | null, withQuestionMark = true): string {
  if (searchParams == null || Object.keys(searchParams).length === 0) return '';

  const innerSearchParams: string[][] = [];

  Object.entries(searchParams).forEach((entry) => {
    const index = entry[0];
    const value = entry[1];

    if (Array.isArray(value)) {
      value.forEach((_value) => {
        innerSearchParams.push([index, _value]);
      });
    } else {
      innerSearchParams.push([index, value]);
    }
  });

  const urlSearchParams = new URLSearchParams(innerSearchParams);

  return `${withQuestionMark ? '?' : ''}${urlSearchParams.toString()}`;
}

export function getRouterNode<BaseURL, SR>(baseUrl: BaseURL, subRoutes: SR): ToStringableObject<BaseURL, SR> {
  const routerNode = Object.entries(subRoutes).reduce((acc, [k, v]) => {
    return { ...acc, [k]: baseUrl + v };
  }, {} as ToStringableObject<BaseURL, SR>);

  routerNode.valueOf = function () {
    return baseUrl;
  };

  routerNode.toString = function () {
    return baseUrl;
  };

  return routerNode;
}

export function getRouterPaths<RouteSettings, ComponentSettings>(
  obj: RoutesDirty<RouteSettings, ComponentSettings>,
): Routes<RouteSettings, ComponentSettings> {
  return obj.map((entry) => ({
    ...entry,
    path: entry.path.toString(),
    settings: { ...entry.settings },
    componentSettings: { ...entry.componentSettings },
    subRoutes: entry.subRoutes == null ? entry.subRoutes : getRouterPaths(entry.subRoutes),
  }));
}

export function getAllMatchesByRegExp(regExp: RegExp, string: string): string[][] {
  let innerRegExp = regExp;

  if (!innerRegExp.flags.includes('g')) {
    innerRegExp = new RegExp(innerRegExp.source, innerRegExp.flags + 'g');
  }

  const result = [];

  let match;
  do {
    match = innerRegExp.exec(string);
    if (match) {
      result.push([match[0], match[1]]);
    }
  } while (match);

  return result;
}

export default {
  getProcessedPath,
  getProcessedSearch,
};
