import { type ICategory } from '@/shared/model/category.model';
import { type IBrand } from '@/shared/model/brand.model';
import { type IColor } from '@/shared/model/color.model';

export interface IProduct {
  id?: number;
  stock?: number;
  name?: string;
  image?: string;
  ean?: string;
  description?: string;
  category?: ICategory;
  brand?: IBrand;
  color?: IColor;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public stock?: number,
    public name?: string,
    public image?: string,
    public ean?: string,
    public description?: string,
    public category?: ICategory,
    public brand?: IBrand,
    public color?: IColor,
  ) {}
}
