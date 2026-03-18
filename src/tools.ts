import { PageConfig, URLExt } from '@jupyterlab/coreutils';

export function getVoilaUrl(path: string): string {
  const baseUrl = PageConfig.getBaseUrl();
  return URLExt.join(baseUrl, 'voila', 'render', path);
}
