import { defineComponent, ref, computed } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import { useAttributeUpdater } from '@/shared/composables/attribute.composable';
import { useProductsStore } from '../product.store';
import { useCategoryStore } from '@/entities/category/category.store';
import { useBrandStore } from '@/entities/brand/brand.store';
import { useColorStore } from '@/entities/color/color.store';

export default defineComponent({
  name: 'NewProductDialog',
  components: {},
  setup() {
    const visible = ref<boolean>(false);
    const product = ref<IProduct>({
      stock: 0,
      name: '',
      image: '',
      ean: '',
      category: { id: 0, name: '' },
      brand: { id: 0, name: '' },
      color: { id: 0, name: '' },
    });
    // stores states
    // category
    const categories = computed(() => useCategoryStore().getData);
    const categoryNames = computed(() => useCategoryStore().getNames);
    const { updateAttribute: updateCategory } = useAttributeUpdater(categories, product, 'category');
    // brand
    const brands = computed(() => useBrandStore().getData);
    const brandNames = computed(() => useBrandStore().getNames);
    const { updateAttribute: updateBrand } = useAttributeUpdater(brands, product, 'brand');
    // color
    const colors = computed(() => useColorStore().getData);
    const colorNames = computed(() => useColorStore().getNames);
    const { updateAttribute: updateColor } = useAttributeUpdater(colors, product, 'color');

    const confirmNewProduct = async () => {
      if (product) {
        await useProductsStore().newEntity(product.value);
        visible.value = false;
      }
    };

    return { visible, product, brandNames, colorNames, categoryNames, updateBrand, updateColor, updateCategory, confirmNewProduct };
  },
});
