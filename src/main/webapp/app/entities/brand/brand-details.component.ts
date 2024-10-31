import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BrandService from './brand.service';
import { type IBrand } from '@/shared/model/brand.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BrandDetails',
  setup() {
    const brandService = inject('brandService', () => new BrandService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const brand: Ref<IBrand> = ref({});

    const retrieveBrand = async brandId => {
      try {
        const res = await brandService().find(brandId);
        brand.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.brandId) {
      retrieveBrand(route.params.brandId);
    }

    return {
      alertService,
      brand,

      previousState,
    };
  },
});
