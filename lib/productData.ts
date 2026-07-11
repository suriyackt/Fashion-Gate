import productsData from "./products.json";

export interface Product {
  id: string; // The slug prepared in proper English based on title
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  subcategory?: string;
  subcategoryAr?: string;
  slogan: string;
  sloganAr: string;
  description: string;
  descriptionAr: string;
  details: string[];
  detailsAr: string[];
  imageUrl: string;
  relatedIds: string[];
  brandId: string; // The corresponding brand ID
}

export const products: Product[] = productsData as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByBrandId(brandId: string): Product[] {
  return products.filter((product) => product.brandId === brandId);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: string, subcategory?: string): Product[] {
  const normCat = category.toLowerCase();
  
  if (normCat === "fashion") {
    // Fashion combines Men and Women clothing/accessories
    return products.filter(p => 
      p.category.toLowerCase() === "women" || p.category.toLowerCase() === "men"
    );
  }

  let filtered = products.filter((product) => product.category.toLowerCase() === normCat);
  
  if (subcategory) {
    const normSub = subcategory.toLowerCase();
    filtered = filtered.filter((product) => 
      product.subcategory?.toLowerCase() === normSub
    );
  }
  
  return filtered;
}
