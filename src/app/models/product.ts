export interface Product {
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
