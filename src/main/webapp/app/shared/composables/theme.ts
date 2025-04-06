import { ref, computed } from 'vue';

const theme = ref<'light' | 'dark'>('dark');

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  // Computed Properties für Styling
  const nameColor = computed(() => (theme.value === 'light' ? 'color: #1A237E' : 'color: #E8EAF6'));

  const navColor = computed(() => (theme.value === 'light' ? 'background-color: #ECEFF1' : 'background-color: #212121'));

  return {
    theme,
    toggleTheme,
    nameColor,
    navColor,
  };
}
