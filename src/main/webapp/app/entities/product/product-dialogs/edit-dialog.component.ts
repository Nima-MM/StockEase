import { defineComponent, ref, computed, onMounted } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import { useAttributeUpdater } from '@/shared/composables/attribute.composable';
import { useCategoryStore } from '@/entities/category/category.store';
import { useBrandStore } from '@/entities/brand/brand.store';
import { useColorStore } from '@/entities/color/color.store';
import { useProductsStore } from '../product.store';

export default defineComponent({
  name: 'EditDialog',
  components: {},
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props) {
    const visible = ref<boolean>(false);
    // TODO: unit test this. it must be at least initialized with fetched data
    // data
    const productToUpdate = ref<IProduct>({
      id: 0,
      stock: 0,
      name: '',
      image: '',
      ean: '',
      description: '',
      category: { id: 0, name: '' },
      brand: { id: 0, name: '' },
      color: { id: 0, name: '' },
    });
    // stores state
    // category
    const categories = computed(() => useCategoryStore().getData);
    const categoryNames = computed(() => useCategoryStore().getNames);
    const { updateAttribute: updateCategory } = useAttributeUpdater(categories, productToUpdate, 'category');
    // brand
    const brands = computed(() => useBrandStore().getData);
    const brandNames = computed(() => useBrandStore().getNames);
    const { updateAttribute: updateBrand } = useAttributeUpdater(brands, productToUpdate, 'brand');
    // color
    const colors = computed(() => useColorStore().getData);
    const colorNames = computed(() => useColorStore().getNames);
    const { updateAttribute: updateColor } = useAttributeUpdater(colors, productToUpdate, 'color');
    // methods
    const confirmEdit = async () => {
      if (props.product) {
        productToUpdate.value.id = parseInt(productToUpdate.value.id as any);
        productToUpdate.value.stock = parseInt(productToUpdate.value.stock as any);
        if (productToUpdate.value.color) {
          productToUpdate.value.color.id = parseInt(productToUpdate.value.color.id as any);
        }
        if (productToUpdate.value.category) {
          productToUpdate.value.category.id = parseInt(productToUpdate.value.category.id as any);
        }
        if (productToUpdate.value.brand) {
          productToUpdate.value.brand.id = parseInt(productToUpdate.value.brand.id as any);
        }
        const p = JSON.parse(JSON.stringify(productToUpdate.value));
        await useProductsStore().editEntity(p);
        visible.value = false;
      }
    };
    // lifecycle hooks
    onMounted(() => {
      productToUpdate.value = props.product;
    });
    return {
      brands,
      categories,
      colors,
      visible,
      categoryNames,
      updateCategory,
      brandNames,
      updateBrand,
      colorNames,
      updateColor,
      productToUpdate,
      confirmEdit,
    };
  },
});
