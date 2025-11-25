import { ShoppingCart, Utensils, Zap, Shirt, Home } from 'lucide-react';

export interface Subcategory {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: typeof ShoppingCart;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingCart,
    subcategories: [
      { id: 'fruits-vegetables', name: 'Fruits and Vegetables', enabled: false },
      { id: 'masala-seasoning', name: 'Masala & Seasoning', enabled: false },
      { id: 'oil-ghee', name: 'Oil & Ghee', enabled: false },
      { id: 'eggs-meat-fish', name: 'Eggs, Meat & Fish', enabled: false },
      { id: 'cleaning-household', name: 'Cleaning & Household', enabled: false },
      { id: 'bakery-cakes-dairy', name: 'Bakery, Cakes & Dairy', enabled: false },
      { id: 'pet-care', name: 'Pet Care', enabled: false },
      { id: 'stationery', name: 'Stationery', enabled: false },
      { id: 'detergents-dishwash', name: 'Detergents and Dishwash', enabled: false },
      { id: 'dairy-cheese', name: 'Dairy and Cheese', enabled: false },
      { id: 'snacks-dry-fruits-nuts', name: 'Snacks, Dry Fruits, Nuts', enabled: false },
      { id: 'pasta-soup-noodles', name: 'Pasta, Soup and Noodles', enabled: false },
      { id: 'cereals-breakfast', name: 'Cereals and Breakfast', enabled: false },
      { id: 'sauces-spreads-dips', name: 'Sauces, Spreads and Dips', enabled: false },
      { id: 'chocolates-biscuits', name: 'Chocolates and Biscuits', enabled: false },
      { id: 'cooking-baking-needs', name: 'Cooking and Baking Needs', enabled: false },
      { id: 'tinned-processed-food', name: 'Tinned and Processed Food', enabled: false },
      { id: 'atta-flours-sooji', name: 'Atta, Flours and Sooji', enabled: false },
      { id: 'rice-rice-products', name: 'Rice and Rice Products', enabled: false },
      { id: 'dals-pulses', name: 'Dals and Pulses', enabled: false },
      { id: 'salt-sugar-jaggery', name: 'Salt, Sugar and Jaggery', enabled: false },
      { id: 'energy-soft-drinks', name: 'Energy and Soft Drinks', enabled: false },
      { id: 'water', name: 'Water', enabled: false },
      { id: 'tea-coffee', name: 'Tea and Coffee', enabled: false },
      { id: 'fruit-juices-drinks', name: 'Fruit Juices and Fruit Drinks', enabled: false },
      { id: 'snacks-namkeen', name: 'Snacks and Namkeen', enabled: false },
      { id: 'ready-to-cook-eat', name: 'Ready to Cook and Eat', enabled: false },
      { id: 'pickles-chutney', name: 'Pickles and Chutney', enabled: false },
      { id: 'indian-sweets', name: 'Indian Sweets', enabled: false },
      { id: 'frozen-vegetables', name: 'Frozen Vegetables', enabled: false },
      { id: 'frozen-snacks', name: 'Frozen Snacks', enabled: false },
      { id: 'gift-voucher', name: 'Gift Voucher', enabled: false },
      { id: 'gourmet-world-foods', name: 'Gourmet & World Foods', enabled: false },
      { id: 'foodgrains', name: 'Foodgrains', enabled: false },
      { id: 'beverages', name: 'Beverages', enabled: false },
      { id: 'beauty-hygiene', name: 'Beauty & Hygiene', enabled: false },
      { id: 'kitchen-accessories', name: 'Kitchen Accessories', enabled: false },
      { id: 'baby-care', name: 'Baby Care', enabled: false },
      { id: 'snacks-branded-foods', name: 'Snacks & Branded Foods', enabled: false },
    ]
  },
  {
    id: 'food',
    name: 'Food',
    icon: Utensils,
    subcategories: [
      { id: 'restaurants', name: 'Restaurants', enabled: false },
      { id: 'cafes', name: 'Cafes', enabled: false },
      { id: 'fast-food', name: 'Fast Food', enabled: false },
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Zap,
    subcategories: [
      { id: 'phones', name: 'Phones', enabled: false },
      { id: 'laptops', name: 'Laptops', enabled: false },
      { id: 'accessories', name: 'Accessories', enabled: false },
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    subcategories: [
      { id: 'clothing', name: 'Clothing', enabled: false },
      { id: 'shoes', name: 'Shoes', enabled: false },
      { id: 'accessories', name: 'Accessories', enabled: false },
    ]
  },
  {
    id: 'home',
    name: 'Home',
    icon: Home,
    subcategories: [
      { id: 'furniture', name: 'Furniture', enabled: false },
      { id: 'decor', name: 'Decor', enabled: false },
      { id: 'appliances', name: 'Appliances', enabled: false },
    ]
  },
];

