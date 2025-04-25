import { type ComputedRef, defineComponent, inject } from 'vue';
import LoginForm from '@/account/login-form/login-form.vue';
import type LoginService from '@/account/login.service';
import { Button } from 'primevue';

export default defineComponent({
  name: 'Home',
  components: {
    'login-form': LoginForm,
    Button,
  },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    const openLogin = () => {
      if (loginService) {
        loginService.openLogin();
      }
    };

    return {
      authenticated,
      username,
      openLogin,
    };
  },
});
