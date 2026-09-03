import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sih36.lmverify',
  appName: 'LM Verify',
  webDir: 'dist',
  server: {
    // Allow mixed content for local dev
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      backgroundColor: '#f9f9ff',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#f9f9ff',
    },
  },
};

export default config;
