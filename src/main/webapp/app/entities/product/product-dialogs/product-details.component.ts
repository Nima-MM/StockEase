import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProductService from '../product.service';
import { type IProduct } from '@/shared/model/product.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  name: 'ProductDetails',
  setup() {
    const productService = inject('productService', () => new ProductService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const product: Ref<IProduct> = ref({});

    const retrieveProduct = async productId => {
      try {
        const res = await productService().find(productId);
        product.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.productId) {
      retrieveProduct(route.params.productId);
    }

    return {
      alertService,
      product,

      previousState,
    };
  },
});
