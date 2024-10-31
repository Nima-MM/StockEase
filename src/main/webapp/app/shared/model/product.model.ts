import { type ICategory } from '@/shared/model/category.model';
import { type IBrand } from '@/shared/model/brand.model';
import { type IColor } from '@/shared/model/color.model';

export interface IProduct {
  id?: number;
  stock?: number | null;
  name?: string | null;
  image?: string | null;
  ean?: string | null;
  description?: string | null;
  category?: ICategory | null;
  brand?: IBrand | null;
  color?: IColor | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public stock?: number | null,
    public name?: string | null,
    public image?: string | null,
    public ean?: string | null,
    public description?: string | null,
    public category?: ICategory | null,
    public brand?: IBrand | null,
    public color?: IColor | null,
  ) {}
}
