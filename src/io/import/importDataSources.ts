import { DataSource, DataSourceWithFile } from './dataSource';

export async function importDataSources(dataSources: DataSource[]) {
  const importContext = {
    fetchFileCache: new Map<string, File>(),
    dicomDataSources: [] as DataSourceWithFile[],
  };

  const middleware = [];
  const loader = new Pipel();
}
