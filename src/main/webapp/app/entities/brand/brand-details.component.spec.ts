/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BrandDetails from './brand-details.vue';
import BrandService from './brand.service';
import AlertService from '@/shared/alert/alert.service';

type BrandDetailsComponentType = InstanceType<typeof BrandDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const brandSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Brand Management Detail Component', () => {
    let brandServiceStub: SinonStubbedInstance<BrandService>;
    let mountOptions: MountingOptions<BrandDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      brandServiceStub = sinon.createStubInstance<BrandService>(BrandService);

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          brandService: () => brandServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        brandServiceStub.find.resolves(brandSample);
        route = {
          params: {
            brandId: `${123}`,
          },
        };
        const wrapper = shallowMount(BrandDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.brand).toMatchObject(brandSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        brandServiceStub.find.resolves(brandSample);
        const wrapper = shallowMount(BrandDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
