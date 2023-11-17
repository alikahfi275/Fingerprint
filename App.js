// BiometricAuthComponent.js
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricAuthComponent = () => {
  const [biometricType, setBiometricType] = useState('');
  const [biometricError, setBiometricError] = useState('');

  // Untuk Menecek apakah ada biometrik
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const checkBiometrics = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (available) {
        setBiometricType(`Biometrics is available. Type: ${biometryType}`);
      } else {
        setBiometricError('Biometrics is not available on this device.');
      }
    } catch (error) {
      console.error(error);
      setBiometricError('Error checking biometrics.');
    }
  };

  const authenticateBiometrics = async () => {
    try {
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Login Menggunakan Sidik Jari',
      });

      if (success) {
        console.log('Biometric authentication successful');
      } else {
        console.log('Biometric authentication failed:', error);
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
    }
  };

  return (
    <View>
      <Text>{biometricType}</Text>
      <Text style={{color: 'red'}}>{biometricError}</Text>
      <Button title="Check Biometrics" onPress={checkBiometrics} />
      <Button
        title="Authenticate Biometrics"
        onPress={authenticateBiometrics}
      />
    </View>
  );
};

export default BiometricAuthComponent;
