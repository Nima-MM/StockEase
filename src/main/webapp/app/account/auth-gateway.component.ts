import { defineComponent, provide, inject, type ComputedRef } from 'vue';
import MainLayout from '@/core/layout/main-layout.vue';
import AccountLayout from '@/core/layout/account-layout.vue';
import { useTheme } from '@/shared/composables/theme';
import { useAlertService } from '@/shared/alert/alert.service';
import type AccountService from './account.service';

export default defineComponent({
  name: 'AuthGateway',
  components: {
    AccountLayout,
    MainLayout,
  },
  async setup() {
    const accountService = inject<AccountService>('accountService')!;

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    await accountService.update();
    provide('alertService', useAlertService());
    const { theme } = useTheme();
    // methods

    return {
      theme,
      authenticated,
    };
  },
});
