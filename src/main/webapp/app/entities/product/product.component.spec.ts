import { shallowMount } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { describe, it, expect, beforeEach, vitest } from 'vitest';

// Deine Komponenten/Services
import Product from './product.vue';
import ProductService from './product.service';
import CategoryService from '../category/category.service';
import BrandService from '../brand/brand.service';
import ColorService from '../color/color.service';
import { useAlertService } from '@/shared/alert/alert.service';

// PrimeVue ToastService
import ToastService from 'primevue/toastservice';

describe('Product Management Component', () => {
  let productServiceStub: SinonStubbedInstance<ProductService>;
  let categoryServiceStub: any;
  let brandServiceStub: any;
  let colorServiceStub: any;
  let alertServiceStub: any;

  beforeEach(() => {
    // ProductService mit sinon stubs
    productServiceStub = sinon.createStubInstance(ProductService);
    productServiceStub.retrieve.resolves({
      headers: {},
      data: [{ id: 123, name: 'Test Product' }],
    });

    // CategoryService, BrandService, ColorService nur einfache Mocks
    categoryServiceStub = {
      retrieve: vitest.fn().mockResolvedValue({ data: [] }),
    };
    brandServiceStub = {
      retrieve: vitest.fn().mockResolvedValue({ data: [] }),
    };
    colorServiceStub = {
      retrieve: vitest.fn().mockResolvedValue({ data: [] }),
    };

    // AlertService likewise
    alertServiceStub = {
      showHttpError: vitest.fn(),
    };
  });

  it('Should retrieve() all entities on init and fill products array', async () => {
    // Komplette Mount-Optionen
    const mountOptions = {
      global: {
        provide: {
          // Services so bereitstellen, dass `inject('serviceName')` diese findet
          productService: () => productServiceStub,
          categoryService: () => categoryServiceStub,
          brandService: () => brandServiceStub,
          colorService: () => colorServiceStub,
          alertService: () => alertServiceStub,
        },
        plugins: [ToastService], // <- Wichtig für useToast()
        stubs: {
          // Falls du bestimmte Child-Komponenten stubben willst:
          'refill-dialog': true,
          'decrease-dialog': true,
          'delete-dialog': true,
          'edit-dialog': true,
        },
      },
    };

    // Wrapper erstellen
    const wrapper = shallowMount(Product, mountOptions);
    const comp = wrapper.vm;

    // Warten, bis onMounted() durch ist
    await comp.$nextTick();

    // Jetzt prüfen:
    // 1) Aufruf
    expect(productServiceStub.retrieve.calledOnce).toBeTruthy();
    // 2) products-Liste enthält das erwartete Ergebnis
    expect(comp.products).toHaveLength(1);
    expect(comp.products[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});

// // /* tslint:disable max-line-length */
// // import { type MountingOptions, shallowMount } from '@vue/test-utils';
// // import sinon, { type SinonStubbedInstance } from 'sinon';
// // import { describe, it, expect, beforeEach, vitest } from 'vitest';

// // import Product from './product.vue';
// // import ProductService from './product.service';
// // import CategoryService from '../category/category.service';
// // import BrandService from '../brand/brand.service';
// // import ColorService from '../color/color.service';
// // import AlertService from '@/shared/alert/alert.service';

// // // PrimeVue ToastService
// // import ToastService from 'primevue/toastservice';

// // type ProductComponentType = InstanceType<typeof Product>;

// // // // const bModalStub = {
// // // //   render: () => {},
// // // //   methods: {
// // // //     hide: () => {},
// // // //     show: () => {},
// // // //   },
// // // // };

// // describe('Component Tests', () => {
// //   // // let alertService: AlertService;

// //   describe('Product Management Component', () => {
// //     let productServiceStub: SinonStubbedInstance<ProductService>;
// //     let categoryServiceStub: any;
// //     let brandServiceStub: any;
// //     let colorServiceStub: any;
// //     let alertServiceStub: any;
// //     let mountOptions: MountingOptions<ProductComponentType>['global'];

// //     beforeEach(() => {
// //       productServiceStub = sinon.createStubInstance<ProductService>(ProductService);
// //       productServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123, name: 'Test Product' }] });

// //       // CategoryService, BrandService, ColorService nur einfache Mocks
// //       categoryServiceStub = {
// //         retrieve: vitest.fn().mockResolvedValue({ data: [] }),
// //       };
// //       brandServiceStub = {
// //         retrieve: vitest.fn().mockResolvedValue({ data: [] }),
// //       };
// //       colorServiceStub = {
// //         retrieve: vitest.fn().mockResolvedValue({ data: [] }),
// //       };

// //       // AlertService likewise
// //       alertServiceStub = {
// //         showHttpError: vitest.fn(),
// //       };
// //       it('Should call retrieve() on init and fill products array', async () => {
// //         // Komplette Mount-Optionen
// //         const mountOptions = {
// //           global: {
// //             provide: {
// //               // Services so bereitstellen, dass `inject('serviceName')` diese findet
// //               productService: () => productServiceStub,
// //               categoryService: () => categoryServiceStub,
// //               brandService: () => brandServiceStub,
// //               colorService: () => colorServiceStub,
// //               alertService: () => alertServiceStub,
// //             },
// //             plugins: [ToastService], // <- Wichtig für useToast()
// //             stubs: {
// //               // Falls du bestimmte Child-Komponenten stubben willst:
// //               'refill-dialog': true,
// //               'decrease-dialog': true,
// //               'delete-dialog': true,
// //               'edit-dialog': true,
// //             },
// //           },
// //         };
// //         // // alertService = new AlertService({
// //         // //   bvToast: {
// //         // //     toast: vitest.fn(),
// //         // //   } as any,
// //         // // });

// //         // // mountOptions = {
// //         // //   stubs: {
// //         // //     bModal: bModalStub as any,
// //         // //     'font-awesome-icon': true,
// //         // //     'b-badge': true,
// //         // //     'b-button': true,
// //         // //     'router-link': true,
// //         // //   },
// //         // //   directives: {
// //         // //     'b-modal': {},
// //         // //   },
// //         // //   provide: {
// //         // //     alertService,
// //         // //     productService: () => productServiceStub,
// //         // //   },
// //         // // };

// //         // Wrapper erstellen
// //         const wrapper = shallowMount(Product, mountOptions);
// //         const comp = wrapper.vm;

// //         // Warten, bis onMounted() durch ist
// //         await comp.$nextTick();

// //         // Jetzt prüfen:
// //         // 1) Aufruf
// //         expect(productServiceStub.retrieve.calledOnce).toBeTruthy();
// //         // 2) products-Liste enthält das erwartete Ergebnis
// //         expect(comp.products).toHaveLength(1);
// //         expect(comp.products[0]).toEqual(expect.objectContaining({ id: 123 }));
// //       });

// //       // describe('Mount', () => {
// //       //   it('Should call load all on init', async () => {
// //       //     // GIVEN
// //       //     productServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

// //       //     // WHEN
// //       //     const wrapper = shallowMount(Product, { global: mountOptions });
// //       //     const comp = wrapper.vm;
// //       //     await comp.$nextTick();

// //       //     // THEN
// //       //     expect(productServiceStub.retrieve.calledOnce).toBeTruthy();
// //       //     expect(comp.products[0]).toEqual(expect.objectContaining({ id: 123 }));
// //       //   });
// //       // });
// //       // // describe('Handles', () => {
// //       // //   let comp: ProductComponentType;

// //       // //   beforeEach(async () => {
// //       // //     const wrapper = shallowMount(Product, { global: mountOptions });
// //       // //     comp = wrapper.vm;
// //       // //     await comp.$nextTick();
// //       // //     productServiceStub.retrieve.reset();
// //       // //     productServiceStub.retrieve.resolves({ headers: {}, data: [] });
// //       // //   });

// //       // //   it('Should call delete service on confirmDelete', async () => {
// //       // //     // GIVEN
// //       // //     productServiceStub.delete.resolves({});

// //       // //     // WHEN
// //       // //     comp.prepareRemove({ id: 123 });

// //       // //     comp.removeProduct();
// //       // //     await comp.$nextTick(); // clear components

// //       // //     // THEN
// //       // //     expect(productServiceStub.delete.called).toBeTruthy();

// //       // //     // THEN
// //       // //     await comp.$nextTick(); // handle component clear watch
// //       // //     expect(productServiceStub.retrieve.callCount).toEqual(1);
// //       // //   });
// //       // // });
// //     });
// //   });
// // });
