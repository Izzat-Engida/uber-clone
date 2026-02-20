import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import { fetchAPI } from '@/lib/fetch';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoaded, signUp, setActive } = useSignUp();

  const handleSignUp = async () => {
    if (!isLoaded || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      
      const signUpAttempt = await signUp.create({
        firstName: form.name.trim(),
        emailAddress: form.email.trim(),
        password: form.password,
      });

      
      if (signUpAttempt.createdSessionId) {
        await fetchAPI('/(api)/user',{
          method:'POST',
          headers:{ 'Content-Type': 'application/json' },
          body:JSON.stringify({
            name:form.name,
            email:form.email,
            clerkId:signUpAttempt.createdUserId
          })
        })
      
        await setActive({ session: signUpAttempt.createdSessionId });

        
        router.replace('/(root)/(tabs)/home'); 
      } else {
 
        setErrorMsg('Account created but could not sign in automatically.');
      }
    } catch (err: any) {
      console.log('Sign-up error:', JSON.stringify(err, null, 2));

      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Sign up failed. Please try again.';

      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={images.signUpCar} style={styles.image} />
          <Text style={styles.title}>Create Your Account</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            autoCapitalize="words"
          />

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

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <CustomButton
            title={isLoading ? 'Creating...' : 'Sign Up'}
            onPress={handleSignUp}
            disabled={isLoading}
            bgVariant="primary"
            style={styles.button}
          />

          <OAuth />

          <Link href="/(auth)/sign-in" style={styles.link}>
            Already have an account?{' '}
            <Text style={styles.linkHighlight}>Log in</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    height: 260,
  },
  image: {
    width: '100%',
    height: 260,
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  button: {
    marginTop: 28,
    width: '100%',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  link: {
    marginTop: 28,
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
  },
  linkHighlight: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});