import { computed, defineComponent, provide, ref } from 'vue';
import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';

import { useAlertService } from '@/shared/alert/alert.service';
// imports
import { useThemeHandler } from '@/shared/composables/use-theme-handler';
import { useRailDrawer } from '@/shared/composables/use-rail-drawer';

import '@/shared/config/dayjs';

export default defineComponent({
  name: 'App',
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,
    'jhi-footer': JhiFooter,
  },
  setup() {
    provide('alertService', useAlertService());
    // refs
    // const { drawer, rail, toggleDrawerState, toggleRailState } = useRailDrawer();
    const theme = ref('light');
    const lightModeColor = ref('');
    const darkModeColor = ref('');
    // computed
    const navTitleStyle = computed(() => {
      if (theme.value === 'light') {
        return (lightModeColor.value = 'color: #1A237E');
      } else {
        return (darkModeColor.value = 'color: #E8EAF6');
      }
    });
    const navStyle = computed(() => {
      if (theme.value === 'light') {
        return (lightModeColor.value = 'background-color: #ECEFF1');
      } else {
        return (darkModeColor.value = 'background-color: #212121');
      }
    });
    const rail = ref<boolean>(false);
    const drawer = ref<boolean>(true);

    const toggleDrawerState = (): void => {
      drawer.value = !drawer.value;
    };
    const toggleRailState = (): void => {
      rail.value = !rail.value;
    };

    // methods
    const { changeTheme } = useThemeHandler(theme);
    return { lightModeColor, darkModeColor, theme, navTitleStyle, navStyle, drawer, rail, toggleDrawerState, toggleRailState, changeTheme };
  },
});
