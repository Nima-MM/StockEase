import { ref } from 'vue';

export function useRailDrawer() {
  const rail = ref<boolean>(false);
  const drawer = ref<boolean>(true);

  const toggleDrawerState = (): void => {
    drawer.value = !drawer.value;
  };
  const toggleRailState = (): void => {
    rail.value = !rail.value;
  };

  return {
    drawer,
    rail,
    toggleDrawerState,
    toggleRailState,
  };
}
