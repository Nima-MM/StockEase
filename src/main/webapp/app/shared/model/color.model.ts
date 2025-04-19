export interface IColor {
  id?: number;
  name?: string;
}

export class Color implements IColor {
  constructor(
    public id?: number,
    public name?: string,
  ) {}
}
