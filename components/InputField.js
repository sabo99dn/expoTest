import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const InputField = ({
  onPress,
  sdt,
  onChange,
  security,
  style,
  placeholder,
  name,
  errors,
  values,
  handleChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={sdt ? styles.inputContainer: null}>
        <TextInput
          onChange={onChange}
          secureTextEntry={security}
          placeholder={placeholder}
          style={style ? style : styles.input}
          onChangeText={handleChange(name)}
          value={values[name]}
        />
        {sdt ? (
          <TouchableOpacity style ={styles.buttonSDT}
          onPress ={() => {
            console.log('test')
            onPress()
          }}>
            <Text style={styles.textSDT}>Nhận mã xác minh</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {errors[name] ? <Text style={styles.errors}>{errors[name]}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buttonSDT: {
    backgroundColor: 'red',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  textSDT: {
    color: 'white',
  },
  errors: {
    marginTop: -10,
    fontSize: 10,
    color: "red",
  },
});

export default InputField;
