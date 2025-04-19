import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import { useProductsStore } from '../product.store';

export default defineComponent({
  name: 'DecreaseDialog',
  components: {},
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props) {
    const visible = ref<boolean>(false);
    const amount = ref<number>(0);

    const confirmReduction = async () => {
      if (props.product) {
        if (isNaN(amount.value)) {
          console.error('amount.value is NaN');
          amount.value = parseInt(amount.value as any);
        }
        if (props.product.id) {
          await useProductsStore().decreaseStock(props.product.id, amount.value);
        }
        amount.value = 0;
        visible.value = false;
      }
    };

    return { visible, amount, confirmReduction };
  },
});
