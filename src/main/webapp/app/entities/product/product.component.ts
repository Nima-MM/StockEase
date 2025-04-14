import { type Ref, defineComponent, inject, onMounted, ref, computed } from 'vue';
import ProductService from './product.service';
import CategoryService from '../category/category.service';
import BrandService from '../brand/brand.service';
import ColorService from '../color/color.service';
import { type IProduct } from '@/shared/model/product.model';
import { useAlertService } from '@/shared/alert/alert.service';
import DeleteDialog from './product-dialogs/delete-dialog.vue';
import EditDialog from './product-dialogs/edit-dialog.vue';
import RefillDialog from './product-dialogs/refill-dialog.vue';
import DecreaseDialog from './product-dialogs/decrease-dialog.vue';
import { useProductsStore } from './product.store';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

export default defineComponent({
  name: 'Product',
  components: {
    RefillDialog: RefillDialog,
    DecreaseDialog: DecreaseDialog,
    DeleteDialog: DeleteDialog,
    EditDialog: EditDialog,
  },
  setup() {
    const productTableHeaders = ref([
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

    // const products: Ref<IProduct[]> = ref(computed(() => useProductsStore().getProducts));
    const products = ref<IProduct[]>([]);
    const categories: Ref<any[]> = ref(computed(() => useProductsStore().getCategoryNames));
    const brands: Ref<any[]> = ref(computed(() => useProductsStore().getBrandNames));
    const colors: Ref<any[]> = ref(computed(() => useProductsStore().getColorNames));

    const isFetching = ref(false);

    // PrimeVue
    const expandedRows = ref();
    const filters = ref();

    const toast = useToast();
    const onRowExpand = (event: any) => {
      toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };
    const onRowCollapse = (event: any) => {
      toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };
    const expandAll = () => {
      // expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    };
    const collapseAll = () => {
      expandedRows.value = null;
    };
    const formatCurrency = (value: any) => {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const getSeverity = (product: any) => {
      switch (product.inventoryStatus) {
        case 'INSTOCK':
          return 'success';

        case 'LOWSTOCK':
          return 'warn';

        case 'OUTOFSTOCK':
          return 'danger';

        default:
          return null;
      }
    };
    // -------- //
    const clear = () => {};
    const initFilters = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      };
    };
    initFilters();
    const retrieveProducts = async () => {
      isFetching.value = true;
      try {
        if (!productService) {
          throw new Error('productService is not provided');
        }
        const res = await productService().retrieve();
        products.value = res.data;
        console.log('products', products.value);
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const initRelationships = () => {
      categoryService()
        .retrieve()
        .then(res => {
          categories.value = res.data;
        });
      brandService()
        .retrieve()
        .then(res => {
          brands.value = res.data;
        });
      colorService()
        .retrieve()
        .then(res => {
          colors.value = res.data;
        });
    };

    initRelationships();
    const handleSyncList = () => {
      retrieveProducts();
    };

    onMounted(async () => {
      await retrieveProducts();
    });

    return {
      // PrimeVue
      filters,
      initFilters,
      expandedRows,
      onRowExpand,
      onRowCollapse,
      formatCurrency,
      getSeverity,
      expandAll,
      collapseAll,
      // PrimeVue
      products,
      productTableHeaders,
      search,
      handleSyncList,
      isFetching,
      retrieveProducts,
      clear,
    };
  },
});

// // const retrieveCategories = async () => {
// //   isFetching.value = true;
// //   try {
// //     const res = await categoryService().retrieve();
// //     categories.value = res.data;
// //   } catch (err) {
// //     alertService.showHttpError(err.response);
// //   } finally {
// //     isFetching.value = false;
// //   }
// // };
// // const retrieveBrands = async () => {
// //   isFetching.value = true;
// //   try {
// //     const res = await brandService().retrieve();
// //     brands.value = res.data;
// //   } catch (err) {
// //     alertService.showHttpError(err.response);
// //   } finally {
// //     isFetching.value = false;
// //   }
// // };
// // const retrieveColor = async () => {
// //   isFetching.value = true;
// //   try {
// //     const res = await colorService().retrieve();
// //     colors.value = res.data;
// //   } catch (err) {
// //     alertService.showHttpError(err.response);
// //   } finally {
// //     isFetching.value = false;
// //   }
// // };
