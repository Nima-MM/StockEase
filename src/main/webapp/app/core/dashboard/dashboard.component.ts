import { type ComputedRef, defineComponent, inject } from 'vue';
import type AccountService from '@/account/account.service';

export default defineComponent({
  name: 'Dashboard',
  components: {},
  async setup() {
    const accountService = inject<AccountService>('accountService')!;
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');
    await accountService.update();

    return {
      authenticated,
      username,
    };
  },
});
