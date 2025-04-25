import { defineComponent, provide } from 'vue';
import { useTheme } from '@/shared/composables/theme';
import MainNavbar from '@/core/navigation/main-navbar.vue';
import { useAlertService } from '@/shared/alert/alert.service';
// imports
import '@/shared/config/dayjs';

export default defineComponent({
  name: 'MainLayout',
  components: {
    'main-navbar': MainNavbar,
  },
  setup() {
    provide('alertService', useAlertService());
    const { theme } = useTheme();

    // methods

    return {
      theme,
    };
  },
});
