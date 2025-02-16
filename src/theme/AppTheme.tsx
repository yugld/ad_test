import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './shared/inputs';
import { dataDisplayCustomizations } from './shared/dataDisplay';
import { navigationCustomizations } from './shared/navigation';
import { surfacesCustomizations } from './shared/surfaces';
import { colorSchemes, typography, shape } from './themePrimitives';
interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
      cssVarPrefix: 'template',
    },
    colorSchemes,
    typography,
    shape,
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...themeComponents,
    },
  });

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
