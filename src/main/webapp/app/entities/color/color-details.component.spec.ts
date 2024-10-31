/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import ColorDetails from './color-details.vue';
import ColorService from './color.service';
import AlertService from '@/shared/alert/alert.service';

type ColorDetailsComponentType = InstanceType<typeof ColorDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const colorSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Color Management Detail Component', () => {
    let colorServiceStub: SinonStubbedInstance<ColorService>;
    let mountOptions: MountingOptions<ColorDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      colorServiceStub = sinon.createStubInstance<ColorService>(ColorService);

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
          colorService: () => colorServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        colorServiceStub.find.resolves(colorSample);
        route = {
          params: {
            colorId: `${123}`,
          },
        };
        const wrapper = shallowMount(ColorDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.color).toMatchObject(colorSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        colorServiceStub.find.resolves(colorSample);
        const wrapper = shallowMount(ColorDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
