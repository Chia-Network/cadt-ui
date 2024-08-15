import { TextInput as FlowbiteTextInput, TextInputProps } from 'flowbite-react';

function TextInput({ ...props }: TextInputProps) {
  return <FlowbiteTextInput {...props} />;
}

export { TextInput };
