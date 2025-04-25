import { defineComponent, inject, type ComputedRef } from 'vue';
import MainLayout from '@/core/layout/main-layout.vue';
import AuthLayout from '@/core/layout/auth-layout.vue';
import { useTheme } from '@/shared/composables/theme';
import type AccountService from '../../account/account.service';

export default defineComponent({
  name: 'Layouts',
  components: {
    AuthLayout,
    MainLayout,
  },
  async setup() {
    const accountService = inject<AccountService>('accountService')!;

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    await accountService.update();
    const { theme } = useTheme();
    // methods

    return {
      theme,
      authenticated,
    };
  },
});
