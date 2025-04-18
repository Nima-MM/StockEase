import { defineComponent, ref, computed, reactive } from 'vue';
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
    const productToUpdate = reactive<IProduct>({
      id: props.product?.id || 0,
      stock: props.product?.stock || 0,
      name: props.product?.name || '',
      image: props.product?.image || '',
      ean: props.product?.ean || '',
      description: props.product?.description || '',
      category: { id: props.product?.category?.id, name: props.product?.category?.name },
      brand: { id: props.product?.brand?.id, name: props.product?.brand?.name || '' },
      color: { id: props.product?.color?.id, name: props.product?.color?.name || '' },
    });
    // stores
    // category
    const categories = computed(() => useCategoryStore().getData);
    const categoryNames = computed(() => useCategoryStore().getNames);
    const { updateAttribute: updateCategory } = useAttributeUpdater(categories, productToUpdate, 'category');
    // brand
    const brands = computed(() => useBrandStore().getData);
    const brandNames = computed(() => useBrandStore().getNames);
    const { updateAttribute: updateBrand } = useAttributeUpdater(brands, productToUpdate, 'brand');
    // color
    const color = computed(() => useColorStore().getData);
    const colorNames = computed(() => useColorStore().getNames);
    const { updateAttribute: updateColor } = useAttributeUpdater(color, productToUpdate, 'color');

    // methods
    const confirmEdit = async () => {
      if (props.product) {
        productToUpdate.id = parseInt(productToUpdate.id as any);
        productToUpdate.stock = parseInt(productToUpdate.stock as any);
        if (productToUpdate.color) {
          productToUpdate.color.id = parseInt(productToUpdate.color.id as any);
        }
        if (productToUpdate.category) {
          productToUpdate.category.id = parseInt(productToUpdate.category.id as any);
        }
        if (productToUpdate.brand) {
          productToUpdate.brand.id = parseInt(productToUpdate.brand.id as any);
        }
        const p = JSON.parse(JSON.stringify(productToUpdate));
        console.log('p: ', p);
        await useProductsStore().editEntity(p);
        visible.value = false;
      }
    };
    return {
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
