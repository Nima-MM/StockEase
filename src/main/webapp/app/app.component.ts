import { defineComponent, provide, inject, type ComputedRef, ref } from 'vue';
import MainLayout from './core/layout/main-layout.vue';
import AccountLayout from './core/layout/account-layout.vue';
import Ribbon from '@/core/ribbon/ribbon.vue';
import { useTheme } from '@/shared/composables/theme';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import { useAlertService } from '@/shared/alert/alert.service';
// imports
import '@/shared/config/dayjs';
// primevue imports

// import Button from 'primevue/button';

export default defineComponent({
  name: 'App',
  components: {
    ribbon: Ribbon,
    'account-layout': AccountLayout,
    'main-layout': MainLayout,
    'jhi-footer': JhiFooter,
  },
  setup() {
    provide('alertService', useAlertService());
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const { theme } = useTheme();
    // methods

    return {
      theme,
      authenticated,
    };
  },
});
