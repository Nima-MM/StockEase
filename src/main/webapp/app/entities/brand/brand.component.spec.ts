/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Brand from './brand.vue';
import BrandService from './brand.service';
import AlertService from '@/shared/alert/alert.service';

type BrandComponentType = InstanceType<typeof Brand>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Brand Management Component', () => {
    let brandServiceStub: SinonStubbedInstance<BrandService>;
    let mountOptions: MountingOptions<BrandComponentType>['global'];

    beforeEach(() => {
      brandServiceStub = sinon.createStubInstance<BrandService>(BrandService);
      brandServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          brandService: () => brandServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        brandServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Brand, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(brandServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.brands[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: BrandComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Brand, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        brandServiceStub.retrieve.reset();
        brandServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        brandServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeBrand();
        await comp.$nextTick(); // clear components

        // THEN
        expect(brandServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(brandServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
