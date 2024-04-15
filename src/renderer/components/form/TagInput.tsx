import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Kbd, TextInput, HelperText } from 'flowbite-react';  // Importing the necessary components from Flowbite

interface TagInputProps {
  defaultValue: string;
  onChange: (tags: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({ defaultValue, onChange, placeholder = 'Enter tags', readonly = false }) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Function to parse the incoming string with multiple delimiters
  const parseTags = (value: string) => {
    return value.split(/,|\|\|/).filter(tag => tag.trim() !== ''); // Split by both ',' and '||'
  };

  // Effect to set initial tags from defaultValue
  useEffect(() => {
    if (defaultValue) {
      setTags(parseTags(defaultValue));
    }
  }, [defaultValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (readonly) return; // Ignore key events when readonly is true

    const { key } = event;
    const trimmedInput = input.trim();

    if ((key === 'Enter' || key === ',') && trimmedInput.length && !tags.includes(trimmedInput)) {
      event.preventDefault();
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      onChange(newTags.join(','));
      setInput('');
    } else if (key === 'Backspace' && !input.length && tags.length) {
      const newTags = tags.slice(0, tags.length - 1);
      setTags(newTags);
      onChange(newTags.join(','));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      setInput(event.target.value.replace(/,|\|\|/g, ''));  // Prevent delimiters in input
    }
  };

  const removeTag = (index: number) => {
    if (!readonly) {
      const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      setTags(newTags);
      onChange(newTags.join(','));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Kbd key={index} className="px-2 py-1 bg-gray-200 rounded shadow">
            {tag}
            {!readonly && (
              <button type="button" onClick={() => removeTag(index)} className="ml-2 text-red-500">
                &times;
              </button>
            )}
          </Kbd>
        ))}
      </div>
      {!readonly && (
        <div>
          <TextInput
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="mt-1 flex-1 w-full"
            shadow={true}
          />
          <HelperText>
            Enter tags separated by commas or '||'. Press 'Enter' or ',' to add a tag. Click '×' to remove a tag.
          </HelperText>
        </div>
      )}
    </div>
  );
};

export { TagInput };
