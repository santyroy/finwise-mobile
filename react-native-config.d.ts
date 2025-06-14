declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    OTP_EXP_TIME_SEC: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
