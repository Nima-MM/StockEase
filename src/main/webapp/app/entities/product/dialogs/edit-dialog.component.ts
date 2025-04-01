import { defineComponent, inject, ref } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import ProductService from '@/entities/product/product.service';
import DialogTemplateComponent from '@/shared/dialog/dialog-template.vue';

export default defineComponent({
  name: 'EditDialog',
  components: {
    'dialog-template': DialogTemplateComponent,
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props) {
    const productService = inject('productService', () => new ProductService());
    // data
    const productToUpdate = ref<IProduct>({
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

    const confirmEdit = async (close: Function) => {
      try {
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
          console.log(p);
          await productService().update(p);
          await productService().retrieve();
          close();
        }
      } catch (error) {
        // alertService.showHttpError(error.response);
      }
    };
    return {
      productToUpdate,
      confirmEdit,
    };
  },
});
