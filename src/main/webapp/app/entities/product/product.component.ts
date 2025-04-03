import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';
import ProductService from './product.service';
import CategoryService from '../category/category.service';
import BrandService from '../brand/brand.service';
import ColorService from '../color/color.service';
import { type IProduct } from '@/shared/model/product.model';
import { useAlertService } from '@/shared/alert/alert.service';
import DeleteDialog from './dialogs/delete-dialog.vue';
import EditDialog from './dialogs/edit-dialog.vue';
import RefillDialog from './dialogs/refill-dialog.vue';
import DecreaseDialog from './dialogs/decrease-dialog.vue';

interface ProductTableHeaders {
  title: string;
  align?: 'start' | 'end' | 'center';
  key?: string;
  sortable?: boolean;
}
export default defineComponent({
  name: 'Product',
  components: {
    RefillDialog: RefillDialog,
    DecreaseDialog: DecreaseDialog,
    DeleteDialog: DeleteDialog,
    EditDialog: EditDialog,
  },
  setup() {
    const productTableHeaders = ref<ProductTableHeaders[]>([
      // { title: "ID", key: "id", align: "start" },
      { title: 'EAN', key: 'ean', align: 'center' },
      { title: 'Kategorie', key: 'category.name', align: 'center' },
      { title: 'Marke', key: 'brand.name', align: 'center' },
      { title: 'Produktname', key: 'name', sortable: true },
      { title: 'Stückzahl', key: 'stock', align: 'center' },
      { title: 'Farbe', key: 'color.name', align: 'center' },
      { title: 'Aktionen', key: 'actions', align: 'center', sortable: false },
    ]);
    const search = ref<string>('');
    const productService = inject('productService', () => new ProductService());
    const categoryService = inject('categoryService', () => new CategoryService());
    const brandService = inject('brandService', () => new BrandService());
    const colorService = inject('colorService', () => new ColorService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const products: Ref<IProduct[]> = ref([]);
    const categories: Ref<any[]> = ref([]);
    const brands: Ref<any[]> = ref([]);
    const colors: Ref<any[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveProducts = async () => {
      isFetching.value = true;
      try {
        const res = await productService().retrieve();
        products.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };
    const retrieveCategories = async () => {
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
    const retrieveColor = async () => {
      isFetching.value = true;
      try {
        const res = await colorService().retrieve();
        colors.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveProducts();
    };

    onMounted(async () => {
      await retrieveProducts();
      await retrieveCategories();
      await retrieveBrands();
      await retrieveColor();
    });

    return {
      products,
      productTableHeaders,
      search,
      handleSyncList,
      isFetching,
      retrieveProducts,
      clear,
      // // removeId,
      // // removeEntity,
      // // prepareRemove,
      // // closeDialog,
      // // removeProduct,
    };
  },
});

// // const removeId: Ref<number> = ref(null);
// // const removeEntity = ref<any>(null);
// // const prepareRemove = (instance: IProduct) => {
// //   removeId.value = instance.id;
// //   removeEntity.value.show();
// // };
// // const closeDialog = () => {
// //   removeEntity.value.hide();
// // };
// // const removeProduct = async () => {
// //   try {
// //     await productService().delete(removeId.value);
// //     const message = `A Product is deleted with identifier ${removeId.value}`;
// //     alertService.showInfo(message, { variant: 'danger' });
// //     removeId.value = null;
// //     retrieveProducts();
// //     closeDialog();
// //   } catch (error) {
// //     alertService.showHttpError(error.response);
// //   }
// // };
