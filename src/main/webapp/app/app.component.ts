import { defineComponent, provide, inject, type ComputedRef, ref } from 'vue';
import Ribbon from '@/core/ribbon/ribbon.vue';
import { useTheme } from '@/shared/composables/theme';
import { useAlertService } from '@/shared/alert/alert.service';
// imports
import '@/shared/config/dayjs';
import AuthGateway from '@/account/auth-gateway.vue';
import FallbackLoader from './core/layout/fallback-loader.vue';
// primevue imports

export default defineComponent({
  name: 'App',
  components: {
    ribbon: Ribbon,
    AuthGateway,
    FallbackLoader,
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
