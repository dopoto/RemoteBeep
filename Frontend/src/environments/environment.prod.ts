import { IConfig } from 'src/app/core/models/config';

export const environment: IConfig = {
  production: true,
  version: '0.0.1',
  clientBuildNumber: '#{Build.BuildNumber}#',
  serverBuildNumber: 'TODO',
  apiEndpoint: '#{ApiEndpoint}#'
};
