import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const handleLogout = async () => {
    if (!isLoaded) return;

    try {
      await signOut();
      // After signOut, Clerk clears the session automatically
      // Redirect to sign-in (or your root auth screen)
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Could not sign out. Try again.');
    }
  };

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        Hello, {user?.firstName || 'User'}!
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#ef4444',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}