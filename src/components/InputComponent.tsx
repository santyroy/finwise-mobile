import {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';
import {Colors} from '@constants/Colors';

interface InputComponentProps<T extends FieldValues> extends TextInputProps {
  name: FieldPath<T>;
  placeHolderText: string;
  control: Control<T>;
}

function InputComponent<T extends FieldValues>({
  name,
  placeHolderText,
  control,
  ...props
}: InputComponentProps<T>) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder={placeHolderText}
          placeholderTextColor={Colors.base.light[20]}
          cursorColor={Colors.violet[100]}
          style={[styles.input, isFocus && styles.focusBorder]}
          onChangeText={onChange}
          onBlur={() => {
            onBlur();
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          value={value}
          {...props}
        />
      )}
    />
  );
}

export default InputComponent;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: Colors.base.light[40],
    borderRadius: 15,
    color: Colors.base.dark[100],
  },
  focusBorder: {
    borderColor: Colors.violet[100],
  },
});
