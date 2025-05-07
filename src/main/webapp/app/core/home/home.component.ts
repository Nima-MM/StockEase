import { type ComputedRef, defineComponent, ref, inject, computed, onMounted } from 'vue';
import LoginForm from '@/account/login-form/login-form.vue';
import type LoginService from '@/account/login.service';
import { useToast } from 'primevue/usetoast';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Home',
  components: {
    'login-form': LoginForm,
  },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');
    const store = useStore();
    const toast = useToast();
    const visible = ref<boolean>(true);

    toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' });

    const onClose = (): void => {
      visible.value = false;
    };
    const openLogin = (): void => {
      if (loginService) {
        loginService.openLogin();
      }
    };

    onMounted(() => {
      if (store.authenticated) {
        setTimeout(() => {
          toast.add({ severity: 'success', summary: `Sie sind als ${username?.value} angemeldet`, group: 'bc' });
          visible.value = true;
        }, 500);
      }
    });
    return {
      authenticated,
      username,
      openLogin,
      onClose,
      visible,
    };
  },
});
