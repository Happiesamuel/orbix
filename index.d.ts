interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  availabilityStatus: string;
  stock: number;
  minimumOrderQuantity: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
}

interface Reviews {
    id:number
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
  reviewerEmail: string;
}

interface Category {
  slug: string;
  name: string;
}

type CatProduct = {
  length: number;
  product: Product;
};
