export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productCategory: string;
  quantity: number;
}

export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}
