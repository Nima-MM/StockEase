import { defineComponent, provide } from 'vue';
import { useTheme } from '@/shared/composables/theme';
import MainNavbar from '@/core/main-navbar/main-navbar.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import { useAlertService } from '@/shared/alert/alert.service';
// imports
import '@/shared/config/dayjs';

export default defineComponent({
  name: 'MainLayout',
  components: {
    'main-navbar': MainNavbar,
    'jhi-footer': JhiFooter,
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
