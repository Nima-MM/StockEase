// imports
import { defineComponent, ref } from 'vue';
import '@/shared/config/dayjs';
import { useTheme } from '@/shared/composables/theme';
// import ThemeBtn from '../theme/theme-btn.vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
// primevue imports
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';

export default defineComponent({
  name: 'MainNavbar',
  components: {
    Menubar: Menubar,
    Avatar: Avatar,
    Button: Button,
    Drawer: Drawer,
  },

  setup() {
    const visible = ref<boolean>(true);
    const rail = ref<boolean>(false);
    const drawer = ref<boolean>(true);
    const store = useStore();
    const router = useRouter();
    const { nameColor, navColor } = useTheme();
    const toggleDrawerState = (): void => {
      drawer.value = !drawer.value;
    };
    const toggleRailState = (): void => {
      rail.value = !rail.value;
    };

    const logout = async () => {
      console.log('logout');
      localStorage.removeItem('jhi-authenticationToken');
      sessionStorage.removeItem('jhi-authenticationToken');
      store.logout();
      if (router.currentRoute.value.path !== '/') {
        router.push('/');
      }
    };
    return { visible, logout, toggleDrawerState, toggleRailState, drawer, rail, nameColor, navColor };
  },
});
