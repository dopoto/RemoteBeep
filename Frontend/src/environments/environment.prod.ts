import { IConfig } from 'src/app/core/models/config';

export const environment: IConfig = {
  production: true,
  version: '#{Build.BuildNumber}#',
  apiEndpoint: '#{ApiEndpoint}#'
};
