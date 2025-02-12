export function useThemeHandler(theme: any) {
  // const theme = ref('light')

  function changeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  return { changeTheme };
}
