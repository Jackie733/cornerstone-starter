export interface UriSource {
  uri: string;
  name: string;
}

export interface FileSource {
  file: File;
  fileType: string;
}

export interface DicomSource {
  sources: DataSource[];
}

export interface DataSource {
  fileSrc?: FileSource;
  usiSrc?: UriSource;
  dicomSrc?: DicomSource;
  parent?: DataSource;
}

export const fileToDataSource = (file: File): DataSource => ({
  fileSrc: {
    file,
    fileType: file.type,
  },
});
