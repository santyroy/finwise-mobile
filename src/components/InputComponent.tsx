import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';
import {Colors} from 'constants/colors';

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
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          placeholder={placeHolderText}
          placeholderTextColor={Colors.base.light[20]}
          style={styles.input}
          onChangeText={onChange}
          onBlur={onBlur}
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
  },
});
