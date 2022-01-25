import Resizer from 'react-image-file-resizer';

export type TFile = {
  source?: string;
  file?: File;
}

export const resizeFile = (item: {
  source?: string;
  file?: File;
}): Promise<string> => new Promise((resolve) => {
  // @ts-ignore
  Resizer.imageFileResizer(item.file,
    700,
    700,
    item.file?.type,
    40,
    0,
    (uri: Blob) => {
      // @ts-ignore
      resolve(uri);
    },
    'file');
});
