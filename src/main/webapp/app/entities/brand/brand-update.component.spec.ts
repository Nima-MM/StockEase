/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BrandUpdate from './brand-update.vue';
import BrandService from './brand.service';
import AlertService from '@/shared/alert/alert.service';

type BrandUpdateComponentType = InstanceType<typeof BrandUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const brandSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<BrandUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Brand Management Update Component', () => {
    let comp: BrandUpdateComponentType;
    let brandServiceStub: SinonStubbedInstance<BrandService>;

    beforeEach(() => {
      route = {};
      brandServiceStub = sinon.createStubInstance<BrandService>(BrandService);
      brandServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          brandService: () => brandServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(BrandUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.brand = brandSample;
        brandServiceStub.update.resolves(brandSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(brandServiceStub.update.calledWith(brandSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        brandServiceStub.create.resolves(entity);
        const wrapper = shallowMount(BrandUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.brand = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(brandServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        brandServiceStub.find.resolves(brandSample);
        brandServiceStub.retrieve.resolves([brandSample]);

        // WHEN
        route = {
          params: {
            brandId: `${brandSample.id}`,
          },
        };
        const wrapper = shallowMount(BrandUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.brand).toMatchObject(brandSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        brandServiceStub.find.resolves(brandSample);
        const wrapper = shallowMount(BrandUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
