import { defineComponent, provide, inject, type ComputedRef, ref } from 'vue';
import Ribbon from '@/core/ribbon/ribbon.vue';
import { useTheme } from '@/shared/composables/theme';
import { useAlertService } from '@/shared/alert/alert.service';
// imports
import '@/shared/config/dayjs';
import FallbackLoader from '@/core/loader/fallback-loader.vue';
import Layouts from './core/layout/layouts.vue';
// primevue imports

export default defineComponent({
  name: 'App',
  components: {
    ribbon: Ribbon,
    Layouts,
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
