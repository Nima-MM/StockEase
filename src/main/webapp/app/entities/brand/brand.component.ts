import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';

import BrandService from './brand.service';
import { type IBrand } from '@/shared/model/brand.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Brand',
  setup() {
    const brandService = inject('brandService', () => new BrandService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const brands: Ref<IBrand[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveBrands = async () => {
      isFetching.value = true;
      try {
        const res = await brandService().retrieve();
        brands.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveBrands();
    };

    onMounted(async () => {
      await retrieveBrands();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IBrand) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeBrand = async () => {
      try {
        await brandService().delete(removeId.value);
        const message = `A Brand is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveBrands();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      brands,
      handleSyncList,
      isFetching,
      retrieveBrands,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeBrand,
    };
  },
});
