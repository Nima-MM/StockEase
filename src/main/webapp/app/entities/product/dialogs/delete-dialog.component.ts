import { defineComponent, inject } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import ProductService from '@/entities/product/product.service';
import DialogTemplateComponent from '@/shared/dialog/dialog-template.vue';

export default defineComponent({
  name: 'DeleteDialog',
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

    const confirmDeletion = async (close: Function) => {
      try {
        if (props.product) {
          await productService().delete(props.product.id);
          await productService().retrieve();
          close();
        }
      } catch (error) {
        // alertService.showHttpError(error.response);
      }
    };
    return {
      confirmDeletion,
    };
  },
});
