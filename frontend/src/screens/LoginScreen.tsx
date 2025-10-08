import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/AuthStack';
import { api } from '@/lib/api';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const resp = await api.login({ email, password });
      // naive token store via global var for demo
      (global as any).authToken = resp.token;
      navigation.getParent()?.navigate('Main' as never);
    } catch (e: any) {
      setError(e.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0E0F13', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#E8ECF1', fontSize: 28, fontWeight: '700', marginBottom: 24 }}>Welcome back</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#8A90A6"
        style={{ backgroundColor: '#151821', color: '#E8ECF1', borderRadius: 12, padding: 16, marginBottom: 12 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#8A90A6"
        style={{ backgroundColor: '#151821', color: '#E8ECF1', borderRadius: 12, padding: 16, marginBottom: 16 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: '#FF6B6B', marginBottom: 12 }}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={{ color: '#8A90A6', textAlign: 'right', marginBottom: 24 }}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSignIn}
        style={{ backgroundColor: '#7C5CFF', borderRadius: 12, padding: 16 }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>{loading ? 'Signing in…' : 'Sign in'}</Text>
      </TouchableOpacity>
    </View>
  );
};


