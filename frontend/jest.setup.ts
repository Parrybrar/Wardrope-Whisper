// Mock native modules for jest
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));
// Basic gesture-handler mock to avoid TurboModule access
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: any) => children
}));

