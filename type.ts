//types.ts - for mapping data types
export type CoffeeShop = {
  id: string;
  name: string;
  district: string;
  description: string;
  phone: string;
  image_url: string;
  latitude: number;
  longitude: number;
};
export type CoffeeShopList = CoffeeShop[];
export type ApiResponse = {
  success: boolean;
  data: CoffeeShopList;
  message?: string;
};

export type ApiResponseDetail = {
  success: boolean;
  data: CoffeeShop;
  message?: string;
};
export type CoffeeShopDetail = CoffeeShop;
export type CoffeeShopDetailResponse = ApiResponseDetail;
