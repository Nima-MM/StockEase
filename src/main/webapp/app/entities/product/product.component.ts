import { defineComponent, onMounted, ref, computed, reactive } from 'vue';
import { useProductsStore } from './product.store';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import type { IProduct } from '@/shared/model/product.model';
import DecreaseDialog from './dialogs/decrease.vue';
import RefillDialog from './dialogs/refill.vue';
import DeleteDialog from './dialogs/delete.vue';
import EditDialog from './dialogs/edit.vue';
import { useCategoryStore } from '../category/category.store';
import { useBrandStore } from '../brand/brand.store';
import { useColorStore } from '../color/color.store';

export default defineComponent({
  name: 'Product',
  components: {
    'edit-dialog': EditDialog,
    'decrease-dialog': DecreaseDialog,
    'refill-dialog': RefillDialog,
    'delete-dialog': DeleteDialog,
  },
  setup() {
    const columnKeys = ref({
      ean: 'EAN',
      category: 'Kategorie',
      brand: 'Marke',
      name: 'Produktname',
      stock: 'Stückzahl',
      color: 'Farbe',
    });
    const products = reactive(computed<IProduct[]>(() => useProductsStore().getProducts));
    const isFetching = reactive(computed<boolean>(() => useProductsStore().isFetching));

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
      expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
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
    onMounted(async () => {
      await useProductsStore().retrieveEntities();
      await useCategoryStore().retrieveEntities();
      await useBrandStore().retrieveEntities();
      await useColorStore().retrieveEntities();
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
      clear,
      // PrimeVue
      products,
      columnKeys,
      isFetching,
    };
  },
});
