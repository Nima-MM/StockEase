/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductService from '../product.service';
import { Product } from '@/shared/model/product.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Product Service', () => {
    let myService: ProductService;
    let elemDefault: Product;

    beforeEach(() => {
      myService = new ProductService();
      elemDefault = new Product(
        123,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        { id: 1, name: 'B' },
        { id: 2, name: 'BB' },
        { id: 3, name: 'BBB' },
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = { ...elemDefault };
        axiosStub.get.resolves({ data: returnedFromService });

        return myService.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should find not an element', async () => {
        axiosStub.get.rejects(error);
        return myService
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Product', async () => {
        const returnedFromService = { id: 123, ...elemDefault };
        const expected = { ...returnedFromService };

        axiosStub.post.resolves({ data: returnedFromService });
        return myService.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Product', async () => {
        axiosStub.post.rejects(error);

        return myService
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Product', async () => {
        const returnedFromService = { stock: 1, name: 'BBBBBB', image: 'BBBBBB', ean: 'BBBBBB', description: 'BBBBBB', ...elemDefault };

        const expected = { ...returnedFromService };
        axiosStub.put.resolves({ data: returnedFromService });

        return myService.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Product', async () => {
        axiosStub.put.rejects(error);

        return myService
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should patch a Product', async () => {
        const patchObject = { stock: 1, name: 'BBBBBB', image: 'BBBBBB', ...new Product() };
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = { ...returnedFromService };
        axiosStub.patch.resolves({ data: returnedFromService });

        return myService.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not patch a Product', async () => {
        axiosStub.patch.rejects(error);

        return myService
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Product', async () => {
        const returnedFromService = { stock: 1, name: 'BBBBBB', image: 'BBBBBB', ean: 'BBBBBB', description: 'BBBBBB', ...elemDefault };
        const expected = { ...returnedFromService };
        axiosStub.get.resolves([returnedFromService]);
        return myService.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Product', async () => {
        axiosStub.get.rejects(error);

        return myService
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Product', async () => {
        axiosStub.delete.resolves({ ok: true });
        return myService.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Product', async () => {
        axiosStub.delete.rejects(error);

        return myService
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
