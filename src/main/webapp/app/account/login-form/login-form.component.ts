import axios from 'axios';
import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type AccountService from '../account.service';
import type LoginService from '@/account/login.service';

export default defineComponent({
  name: 'Login',
  setup() {
    const authenticationError: Ref<boolean> = ref(false);
    const login: Ref<string | null> = ref(null);
    const password: Ref<string | null> = ref(null);
    const rememberMe: Ref<boolean> = ref(false);
    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const accountService = inject<AccountService>('accountService')!; // !-operator indicates that accountService is not undefined
    const loginService = inject<LoginService>('loginService')!;

    const doLogin = async () => {
      const data = { username: login.value, password: password.value, rememberMe: rememberMe.value };
      try {
        const result = await axios.post('api/authenticate', data);
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (rememberMe.value) {
            localStorage.setItem('jhi-authenticationToken', jwt);
            sessionStorage.removeItem('jhi-authenticationToken');
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
            localStorage.removeItem('jhi-authenticationToken');
          }
        }

        authenticationError.value = false;
        loginService.hideLogin();
        await accountService.retrieveAccount();
        if (route.path === '/forbidden') {
          previousState();
        }
      } catch (_error) {
        authenticationError.value = true;
      }
    };

    // // const firstName = ref('');
    // // const firstNameRules = [
    // //   value => {
    // //     if (value?.length >= 3) return true;
    // //     return 'First name must be at least 3 characters.';
    // //   },
    // // ];

    // // const lastName = ref('123');
    // // const lastNameRules = [
    // //   value => {
    // //     if (/[^0-9]/.test(value)) return true;
    // //     return 'Last name can not contain digits.';
    // //   },
    // // ];
    return {
      authenticationError,
      login,
      password,
      rememberMe,
      accountService,
      doLogin,
    };
  },
});
