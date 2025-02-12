import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ColorService from './color.service';
import { type IColor } from '@/shared/model/color.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  name: 'ColorDetails',
  setup() {
    const colorService = inject('colorService', () => new ColorService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const color: Ref<IColor> = ref({});

    const retrieveColor = async colorId => {
      try {
        const res = await colorService().find(colorId);
        color.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.colorId) {
      retrieveColor(route.params.colorId);
    }

    return {
      alertService,
      color,

      previousState,
    };
  },
});
