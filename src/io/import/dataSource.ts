/**
 * Represents a URI source with a file name for the downloaded resource.
 * This can optionally be paired with a FileSource, indicating that the
 * FileSource is a remote FileSource.
 */
export interface UriSource {
  uri: string;
  name: string;
}

/**
 * Represents a user-specified file.
 * This can optionally be paired with an ArchiveSource.
 */
export interface FileSource {
  file: File;
  fileType: string;
}

/**
 * If an archive source is specified, then it is assumed that the data source
 * has a FileSource (representing the file inside the archive), and a parent
 * data source with a FileSource that refers to the archive.
 */
export interface ArchiveSource {
  // Full path + filename inside the archive
  path: string;
}

/**
 * Used to collect DICOM file data sources.
 * This is currently used for consolidating multiple DICOM files into one
 * DataSource for error stack trace purposes.
 */
export interface DicomSource {
  sources: DataSource[];
}

/**
 * Represents a source of data.
 *
 * If the parent property is set, it represents the DataSource from which this
 * DataSource was derived.
 *
 * Examples:
 * - { uriSrc }: a file that has yet to be downloaded.
 * - { fileSrc, parent: { uriSrc } }: a file with URI provenance info.
 * - { fileSrc, archiveSrc, parent }: a file originating from an archive.
 * - { dicomSrc }: a list of dicom data sources.
 */
export interface DataSource {
  fileSrc?: FileSource;
  usiSrc?: UriSource;
  archiveSrc?: ArchiveSource;
  dicomSrc?: DicomSource;
  parent?: DataSource;
}

export type DataSourceWithFile = DataSource & { fileSrc: FileSource };

/**
 * Creates a DataSource from a single file.
 * @param file
 * @returns
 */
export const fileToDataSource = (file: File): DataSource => ({
  fileSrc: {
    file,
    fileType: file.type,
  },
});
