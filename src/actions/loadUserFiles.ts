import { DataSource, fileToDataSource } from '@/io/import/dataSource';

function loadDataSources(sources: DataSource[]) {
  console.log('data sources: ', sources);
}

export function openFileDialog() {
  return new Promise<File[]>((resolve) => {
    const fileEl = document.createElement('input');
    fileEl.setAttribute('type', 'file');
    fileEl.setAttribute('multiple', 'multiple');
    fileEl.setAttribute('accept', '*');
    fileEl.addEventListener('change', () => {
      const files = [...(fileEl.files ?? [])];
      resolve(files);
    });
    fileEl.click();
  });
}

export async function loadFiles(files: File[]) {
  const dataSources = files.map(fileToDataSource);
  return loadDataSources(dataSources);
}

export async function loadUserPromptedFile() {
  const files = await openFileDialog();
  return loadFiles(files);
}
