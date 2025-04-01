import { defineComponent } from 'vue';
import LoginForm from '@/account/login-form/login-form.vue';

export default defineComponent({
  name: 'AccountLayout',
  components: {
    'login-form': LoginForm,
  },
  setup() {},
});
