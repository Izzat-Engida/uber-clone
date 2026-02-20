import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignIn } from '@clerk/clerk-expo';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, setActive, isLoaded } = useSignIn();

  const handleSignIn = async () => {
    if (!isLoaded || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
    
        console.log('Sign in not complete:', signInAttempt);
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign in error:', JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.longMessage || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={images.signUpCar} style={styles.image} />
          <Text style={styles.title}>Welcome 👋</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <CustomButton
            title="Sign in"
            onPress={handleSignIn}
            bgVariant="primary"
            disabled={isLoading}
            isLoading={isLoading}
            style={styles.button}
          />

          <OAuth />

          <Link href="/(auth)/sign-up" style={styles.link}>
            Don't have an account?{' '}
            <Text style={styles.linkHighlight}>Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  button: {
    marginTop: 24,
    width: '100%',
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    color: '#374151',
  },
  linkHighlight: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});