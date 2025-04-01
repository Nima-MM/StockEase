import { defineComponent, ref } from 'vue';
import { useDialogEventHandler } from '@/shared/composables/use-dialog-event-handler';

// props
export default defineComponent({
  name: 'DialogTemplate',
  components: {},
  props: {
    overlayStyle: {
      type: String,
      default: 'bg-gray-900 bg-opacity-50',
    },
    cardStyle: {
      type: String,
      default: 'bg-white rounded-lg shadow-lg',
    },
    headerHeight: {
      type: String,
      default: 'h-16',
    },
    headerBackgroundColor: {
      type: String,
      default: 'bg-gray-800',
    },
    headerIcon: {
      type: String,
      default: 'fas fa-exclamation-triangle',
    },
    headerIconColor: {
      type: String,
      default: 'text-white',
    },
    headerTitle: {
      type: String,
      default: 'Dialog Title',
    },
    inputStyle: {
      type: String,
      default: 'border border-gray-300 rounded-lg p-2 w-full',
    },
    textSlotStyle: {
      type: String,
      default: 'text-gray-700',
    },
  },
  setup(props) {
    // Dialogstatus
    const internalDialog = ref(false);
    const { openDialog, closeDialog } = useDialogEventHandler(internalDialog);
    // methods
    return {
      internalDialog,
      openDialog,
      closeDialog,
    };
  },
});

// // <!-- <script setup lang="ts">
// // import { ref, useSlots } from "vue";
// // import { useDialogEventHandler } from "@/shared/composables/use-dialog-event-handler";

// // // props
// // defineProps<{
// //     overlayStyle?: string;
// //     cardStyle?: string;
// //     headerHeight?: string;
// //     headerBackgroundColor?: string;
// //     headerIcon?: string;
// //     headerIconColor?: string;
// //     headerTitle?: string;
// //     inputStyle?: string;
// //     textSlotStyle?: string;
// // }>();
// // // Dialogstatus
// // const internalDialog = ref(false);

// // const { openDialog, closeDialog } =
// //     useDialogEventHandler(internalDialog);
// // </script> -->

// // <!-- <template v-for="(actionButtons, index) in getActionButtons()" :key="index">
// //     <slot :name="actionButtons" :close="closeDialog"></slot>
// //     </template> -->
// // <!-- // get all slots as object
// //     const slots = useSlots();
// //     // function to iterate over the slots obeject slots and get the action slots as araray
// //     const getActionButtons = () => {
// //         return Object.keys(slots).filter(slot => slot.startsWith('action'));
// //     }; -->
