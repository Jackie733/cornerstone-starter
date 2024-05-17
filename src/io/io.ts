import { Maybe } from '../types';
import { getFileMimeFromMagic } from './magic';
import { MIME_TYPES, FILE_EXTENSIONS, FILE_EXT_TO_MIME } from './mimeTypes';

export async function getFileMimeType(file: File): Promise<Maybe<string>> {
  const fileType = file.type.toLowerCase();
  if (MIME_TYPES.has(fileType)) {
    return fileType;
  }

  if (FILE_EXTENSIONS.has(fileType)) {
    return FILE_EXT_TO_MIME[fileType];
  }

  const supportedExt = [...FILE_EXTENSIONS].find((ext) =>
    file.name.toLowerCase().endsWith(`.${ext}`)
  );
  if (supportedExt) {
    return FILE_EXT_TO_MIME[supportedExt];
  }

  const mimeFromMagic = await getFileMimeFromMagic(file);
  if (mimeFromMagic && MIME_TYPES.has(mimeFromMagic)) {
    return mimeFromMagic;
  }

  return null;
}
