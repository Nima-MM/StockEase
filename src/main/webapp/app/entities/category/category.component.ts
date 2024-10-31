import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';

import CategoryService from './category.service';
import { type ICategory } from '@/shared/model/category.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Category',
  setup() {
    const categoryService = inject('categoryService', () => new CategoryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const categories: Ref<ICategory[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCategorys = async () => {
      isFetching.value = true;
      try {
        const res = await categoryService().retrieve();
        categories.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCategorys();
    };

    onMounted(async () => {
      await retrieveCategorys();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICategory) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCategory = async () => {
      try {
        await categoryService().delete(removeId.value);
        const message = `A Category is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCategorys();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      categories,
      handleSyncList,
      isFetching,
      retrieveCategorys,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCategory,
    };
  },
});
