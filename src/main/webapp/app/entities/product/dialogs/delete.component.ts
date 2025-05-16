import { defineComponent, inject, ref } from 'vue';
import type { PropType } from 'vue';
import { type IProduct } from '@/shared/model/product.model';
import { useProductsStore } from '../product.store';

export default defineComponent({
  name: 'DeleteDialog',
  components: {},
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props) {
    const visible = ref<boolean>(false);

    const confirmDeletion = async () => {
      if (props.product.id) {
        await useProductsStore().deleteEntity(props.product.id);
      }
      visible.value = false;
    };

    return {
      confirmDeletion,
      visible,
    };
  },
});
