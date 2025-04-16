import axios from 'axios';
import { type IProduct } from '@/shared/model/product.model';
import type { I } from 'vitest/dist/chunks/reporters.WnPwkmgA.js';

const baseApiUrl = 'api/products';

export default class ProductService {
  public find(id: number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number | undefined): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IProduct): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IProduct): Promise<IProduct> {
    console.log('ProductService.update', entity);
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/update/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //TODO: fix endpoint
  public partialUpdate(entity: IProduct): Promise<IProduct> {
    console.log('ProductService.partialUpdate', entity);
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/update/patch`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //! Refill stock of a product
  public addToStock(id: number | undefined, amount: number | undefined): Promise<IProduct> {
    return new Promise<IProduct>(async (resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${id}/refill?amount=${amount}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //! Reduce stock of a product
  public decreaseStock(id: number | undefined, amount: number | undefined): Promise<IProduct> {
    return new Promise<IProduct>(async (resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${id}/buy?amount=${amount}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
