import fs, { read } from 'fs'
export function getPathAndQuery(url: string) {
  return new URL(url);
  // return urlObject.pathname + urlObject.search + urlObject.hash;
}

// export function isUrl()
export const titleToSlug = (inputString: string): string =>
  inputString.trim().split(' ')
    .filter(word => word !== '')
    .join('-');

export async function renameDirectory(oldPath:string, newPath:string,) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
        console.error('Error renaming directory:', err);
      return;
    }
  });
}
export function capitalizeFirstLetter(str: string) {
  if (!str) {
    return str; // Return empty string or null if input is empty or null
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function createFixedLengthString(inputString:string | undefined, desiredLength:number) {
  if (!inputString) { return ''}
  if (inputString.length >= desiredLength) {
    return inputString.slice(0, desiredLength) + '...'
  } else {
    return inputString;
  }
}