import React, { useCallback, useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { selectFolderDialogue } from '@/utils/os';
import { SelectFolderDialogResponse } from '@/vite-env';

interface FolderSelectorProps {
  onSelect: (
    path: string,
    sizeMb: number,
    fee: number) => void;
}

const FolderSelector: React.FC<FolderSelectorProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleOpenFolder = useCallback(async () => {
    const openFolderResponse: SelectFolderDialogResponse = await selectFolderDialogue();

    if (openFolderResponse?.success) {
      setInputValue(openFolderResponse.folderPath);
      onSelect(openFolderResponse.folderPath, openFolderResponse.folderSizeMb, openFolderResponse.fee);
    } else if (openFolderResponse?.error) {
      console.error('Failed to open folder. Error:\n', openFolderResponse.error);
    }
  }, [onSelect]);

  return (
    <div className="flex w-full">
      <Button style={{width: 150, marginRight: 5}} onClick={handleOpenFolder} className="capitalize">
        <FormattedMessage id="choose-folder" />
      </Button>
      <TextInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full rounded-r-md rounded-l-none rounded-tl-none rounded-bl-none"
        readOnly
      />
    </div>
  );
};

export { FolderSelector };
