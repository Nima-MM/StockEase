import { defineComponent, inject, ref } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import ProductService from '@/entities/product/product.service';
import DialogTemplateComponent from '@/shared/dialog/dialog-template.vue';

export default defineComponent({
  name: 'DecreaseDialog',
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
    const amount = ref<number | null>();
    const confirmReduction = async (close: Function) => {
      if (props.product) {
        amount.value = parseInt(amount.value as any);
        props.product.stock = (props.product.stock as any) - (amount.value || 0);
        await productService().decreaseStock(props.product.id, amount.value);
        amount.value = null;
        close();
      }
    };

    return { amount, confirmReduction };
  },
});
