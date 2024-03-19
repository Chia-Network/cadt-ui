import path from "path";
import fs from "fs";
import { stat, readdir } from "fs/promises";


const dirSize = async directory => {
  const files = await readdir( directory );
  const stats = files.map( file => stat( path.join( directory, file ) ) );

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

/**
 * calculates the size of a folder in megabytes. Will return 0 megabytes if the folder is empty.
 * @param folderPath
 * @returns the size of the folder in megabytes
 */
export const calcFolderSize = async (folderPath: string): Promise<number> => {

  const folderItems :string[] = fs.readdirSync(folderPath);
  if (folderItems.length === 0) {
    return 0;
  }

  const selectedFolderSizeBytes: number | undefined = await dirSize(folderPath);
  if (!selectedFolderSizeBytes && (selectedFolderSizeBytes !== 0)) {
    throw(new Error('Folder size could not be determined.'));
  }

  return selectedFolderSizeBytes / 1048576; // bytes / 1024 (kb) * 1024 (mb)
}

