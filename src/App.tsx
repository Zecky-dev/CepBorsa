import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// Screens
import {
  Login,
  Register,
  ForgotPassword,
  Home,
  Bot,
  Exchange,
  Profile,
  Favorites,
  StockDetail,
  StockChat,
} from '@screens';

// ThemeProvider
import {ThemeProvider, AuthProvider, LanguageProvider} from '@context';
import {MenuProvider} from 'react-native-popup-menu';
import {useAuth} from '@context/AuthProvider';
import { useTranslation } from 'react-i18next';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Toast
import Toast from 'react-native-toast-message';
import {toastConfig} from '@utils/config/toastHelper';

// Theming
import {useTheme} from '@context/ThemeProvider';
import {createThemeColors} from '@utils/themes';

// Components
import {Icon, TabItemIcon, Loading, CustomHomeHeader} from '@components';
import {SafeAreaView, StatusBar} from 'react-native';
import { t } from 'i18next';

// Common Header Options
const COMMON_HEADER_OPTIONS = (colors: any): NativeStackNavigationOptions => ({
  headerTitleStyle: {
    color: colors.white,
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerBackButtonDisplayMode: 'minimal',
  headerTitleAlign: 'center',
});

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  const {theme} = useTheme();
  const colors = createThemeColors(theme);

  return (
    <Stack.Navigator
      screenOptions={{
        ...COMMON_HEADER_OPTIONS(colors),
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <CustomHomeHeader />,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
      />
      <Stack.Screen name="StockDetail" component={StockDetail} />
      <Stack.Screen
        name="StockChat"
        component={StockChat}
      />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  const {theme} = useTheme();
  const colors = createThemeColors(theme);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 60,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <TabItemIcon focused={focused}>
              <Icon
                name="candlestick-chart"
                type="material"
                size={24}
                color={focused ? colors.primary : colors.white}
              />
            </TabItemIcon>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={Exchange}
        options={{
          tabBarIcon: ({focused}) => (
            <TabItemIcon focused={focused}>
              <Icon
                name="currency-exchange"
                type="material"
                size={24}
                color={focused ? colors.primary : colors.white}
              />
            </TabItemIcon>
          ),
          ...COMMON_HEADER_OPTIONS(colors),
        }}
      />
      <Tab.Screen
        name="Bot"
        component={Bot}
        options={{
          tabBarIcon: ({focused}) => (
            <TabItemIcon focused={focused}>
              <Icon
                name="robot-excited"
                type="material-community"
                size={24}
                color={focused ? colors.primary : colors.white}
              />
            </TabItemIcon>
          ),
          title: 'CepBorsa BOT 🤖',
          ...COMMON_HEADER_OPTIONS(colors),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabItemIcon focused={focused}>
              <Icon
                name="account"
                type="material-community"
                size={24}
                color={focused ? colors.primary : colors.white}
              />
            </TabItemIcon>
          ),
          ...COMMON_HEADER_OPTIONS(colors),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const {user, initializing} = useAuth();
  const {theme} = useTheme();
  const colors = createThemeColors(theme);

  if (initializing) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />
      <NavigationContainer>
        {user ? <TabStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const AppWithContext = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppWithContext;
