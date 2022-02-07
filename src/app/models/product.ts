export interface Product {
  // TODO: Rename IProduct
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productCategory: string;
  quantityInStock: number;
  merchantId: string;
  created: Date;
  lastUpdate: Date;
}

export interface IProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  categories: string[];
  items: string[];
  pageNumber: number;
  pageSize: number;
}
