// imports
import { defineComponent, ref } from 'vue';
import '@/shared/config/dayjs';
import { useTheme } from '@/shared/composables/theme';
import ThemeBtn from '../theme/theme-btn.vue';

export default defineComponent({
  name: 'App',
  components: {
    'theme-btn': ThemeBtn,
  },

  setup() {
    const rail = ref<boolean>(false);
    const drawer = ref<boolean>(true);

    const { nameColor, navColor } = useTheme();
    const toggleDrawerState = (): void => {
      drawer.value = !drawer.value;
    };
    const toggleRailState = (): void => {
      rail.value = !rail.value;
    };
    return { toggleDrawerState, toggleRailState, drawer, rail, nameColor, navColor };
  },
});
