import { DataSource } from './dataSource';

interface DataResult {
  dataSource: DataSource;
}

export interface LoadableResult extends DataResult {
  dataID: string;
  dataType: 'image' | 'dicom' | 'model';
}

export interface VolumeResult extends LoadableResult {
  dataType: 'image' | 'dicom';
}

export interface ConfigResult extends DataResult {
  // config: Config;
}

export type ImportResult = LoadableResult | ConfigResult | DataResult;

export interface ImportContext {
  // Caches URL responses
  // fetchFileCache?: FetchCache<File>;
  // Caches archives. ArchiveFile -> { [archivePath]: File }
  // archiveCache?: ArchiveCache;
  // Records dicom files
  dicomDataSources?: DataSource[];
}
