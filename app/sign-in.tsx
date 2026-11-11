import { useState } from 'react';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppleMark } from '@/components/AppleMark';
import { colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

export default function SignInScreen() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const resetFeedback = () => {
    setErrorMessage(null);
    setNotice(null);
  };

  const toggleMode = () => {
    setIsCreatingAccount((current) => !current);
    resetFeedback();
  };

  const submit = async () => {
    resetFeedback();
    const trimmedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setErrorMessage('Enter your email and password to continue.');
      return;
    }

    if (isCreatingAccount) {
      if (!displayName.trim()) {
        setErrorMessage('Add the name you would like friends to see.');
        return;
      }
      if (!/^[a-z0-9_]{3,24}$/.test(normalizedUsername)) {
        setErrorMessage('Your handle needs 3–24 lowercase letters, numbers, or underscores.');
        return;
      }
      if (password.length < 8) {
        setErrorMessage('Use a password with at least 8 characters.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (isCreatingAccount) {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            emailRedirectTo: Linking.createURL('auth/callback'),
            data: {
              display_name: displayName.trim(),
              username: normalizedUsername,
            },
          },
        });
        if (error) throw error;

        if (!data.session) {
          setNotice('Check your email to confirm your account, then come back here to log in.');
          setIsCreatingAccount(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.page}>
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <AppleMark size={48} tone="red" />
          <Text style={styles.brand}>Pip</Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>{isCreatingAccount ? 'Find your favorite.' : 'Welcome back.'}</Text>
          <Text style={styles.subtitle}>
            {isCreatingAccount
              ? 'Create your public apple-tasting profile.'
              : 'Pick up where your apple rankings left off.'}
          </Text>
        </View>

        <View style={styles.form}>
          {isCreatingAccount ? (
            <>
              <Field label="Name friends will see" value={displayName} onChangeText={setDisplayName} placeholder="e.g. Nathan" />
              <Field label="Handle" value={username} onChangeText={setUsername} placeholder="e.g. nathan" autoCapitalize="none" />
            </>
          ) : null}
          <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" />
          <Field label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={submit}
            style={({ pressed }) => [styles.submit, (pressed || isSubmitting) && styles.submitPressed]}>
            {isSubmitting ? <ActivityIndicator color={colors.surface} /> : <Text style={styles.submitText}>{isCreatingAccount ? 'Create profile' : 'Log in'}</Text>}
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={toggleMode} style={styles.toggle}>
          <Text style={styles.toggleText}>
            {isCreatingAccount ? 'Already have Pip? ' : 'New to Pip? '}
            <Text style={styles.toggleAction}>{isCreatingAccount ? 'Log in' : 'Create a profile'}</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  autoCapitalize?: 'none';
  keyboardType?: 'email-address';
  secureTextEntry?: boolean;
};

function Field({ label, ...inputProps }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        autoCorrect={false}
        placeholderTextColor="#9B958A"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.cream, flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 28 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 45 },
  brand: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4 },
  intro: { gap: 9, marginBottom: 32 },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 35, letterSpacing: -1.5 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  form: { gap: 16 },
  field: { gap: 7 },
  label: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  input: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 13, borderWidth: 1, color: colors.ink, fontSize: 16, height: 52, paddingHorizontal: 14 },
  error: { backgroundColor: colors.redSoft, borderRadius: 11, color: colors.red, fontSize: 13, lineHeight: 19, padding: 12 },
  notice: { backgroundColor: colors.greenSoft, borderRadius: 11, color: colors.green, fontSize: 13, lineHeight: 19, padding: 12 },
  submit: { alignItems: 'center', backgroundColor: colors.red, borderRadius: 14, height: 54, justifyContent: 'center', marginTop: 8 },
  submitPressed: { opacity: 0.72 },
  submitText: { color: colors.surface, fontSize: 16, fontWeight: '800' },
  toggle: { alignItems: 'center', marginTop: 25, padding: 8 },
  toggleText: { color: colors.muted, fontSize: 14 },
  toggleAction: { color: colors.red, fontWeight: '800' },
});
