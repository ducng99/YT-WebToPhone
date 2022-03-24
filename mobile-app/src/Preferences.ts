import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme } from 'react-native-paper';
import merge from 'deepmerge';

export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);