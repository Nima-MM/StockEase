import axios from 'axios';
import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type AccountService from '../account.service';
// import type LoginService from '@/account/login.service';

export default defineComponent({
  name: 'Login',
  setup() {
    const authenticationError: Ref<boolean> = ref(false);
    const username: Ref<string | null> = ref(null);
    const password: Ref<string | null> = ref(null);
    const rememberMe: Ref<boolean> = ref(false);
    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const accountService = inject<AccountService>('accountService')!; // !-operator indicates that accountService is not undefined
    // const loginService = inject<LoginService>('loginService')!;

    const doLogin = async () => {
      const data = { username: username.value, password: password.value, rememberMe: rememberMe.value };
      try {
        console.log('login', data);
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
        // loginService.hideLogin();
        await accountService.retrieveAccount();
        if (route.path === '/forbidden') {
          previousState();
        }
      } catch (_error) {
        authenticationError.value = true;
      }
    };

    return {
      authenticationError,
      username,
      password,
      rememberMe,
      accountService,
      doLogin,
    };
  },
});
