import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { categories } from '@/lib/categories';
import ProductPreview from '@/components/ProductPreview';

export interface Product {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  additionalImages: string[];
  unit: 'Kg' | 'Gram' | 'Pieces';
  quantity: number;
  price: number;
  discountPrice?: number;
  stock: number;
  tags: string[];
}

const STORAGE_KEY = 'subcategoryProducts';

// Sample products data
const getSampleProducts = (subcategoryId: string): Product[] => {
  const samples: Record<string, Product[]> = {
    'fruits-vegetables': [
      {
        id: '1',
        name: 'Fresh Organic Tomatoes',
        description: 'Farm-fresh organic tomatoes, rich in vitamins and perfect for salads and cooking.',
        mainImage: 'https://images.unsplash.com/photo-1546095668-93c5c38b7bcf?w=400',
        additionalImages: [
          'https://images.unsplash.com/photo-1546095668-93c5c38b7bcf?w=400',
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'
        ],
        unit: 'Kg',
        quantity: 1,
        price: 120,
        discountPrice: 99,
        stock: 50,
        tags: ['fresh', 'organic', 'seasonal']
      },
      {
        id: '2',
        name: 'Premium Carrots',
        description: 'Sweet and crunchy carrots, packed with beta-carotene and essential nutrients.',
        mainImage: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 80,
        discountPrice: 65,
        stock: 75,
        tags: ['fresh', 'organic']
      },
      {
        id: '3',
        name: 'Crisp Green Bell Peppers',
        description: 'Fresh bell peppers, perfect for stir-fries, salads, and stuffing.',
        mainImage: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 150,
        stock: 40,
        tags: ['fresh', 'seasonal']
      },
      {
        id: '4',
        name: 'Organic Spinach',
        description: 'Tender organic spinach leaves, rich in iron and perfect for salads.',
        mainImage: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'],
        unit: 'Gram',
        quantity: 250,
        price: 45,
        discountPrice: 35,
        stock: 100,
        tags: ['fresh', 'organic']
      },
      {
        id: '5',
        name: 'Sweet Potatoes',
        description: 'Nutritious sweet potatoes, great for baking and roasting.',
        mainImage: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 90,
        stock: 60,
        tags: ['fresh', 'organic', 'seasonal']
      },
      {
        id: '6',
        name: 'Fresh Broccoli',
        description: 'Crisp broccoli florets, high in fiber and vitamin C.',
        mainImage: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 110,
        discountPrice: 95,
        stock: 35,
        tags: ['fresh', 'organic']
      },
      {
        id: '7',
        name: 'Red Onions',
        description: 'Sharp and flavorful red onions, essential for cooking.',
        mainImage: 'https://images.unsplash.com/photo-1618512496249-4e4b91d8b0e5?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1618512496249-4e4b91d8b0e5?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 70,
        stock: 80,
        tags: ['fresh', 'seasonal']
      },
      {
        id: '8',
        name: 'Cucumber',
        description: 'Cool and refreshing cucumbers, perfect for salads and snacks.',
        mainImage: 'https://images.unsplash.com/photo-1604977049386-4b1eb7c8e0b0?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1604977049386-4b1eb7c8e0b0?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 60,
        discountPrice: 50,
        stock: 90,
        tags: ['fresh']
      },
      {
        id: '9',
        name: 'Cauliflower',
        description: 'Fresh cauliflower, versatile and nutritious vegetable.',
        mainImage: 'https://images.unsplash.com/photo-1593111774240-d529f1ba5d28?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1593111774240-d529f1ba5d28?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 85,
        stock: 45,
        tags: ['fresh', 'seasonal']
      },
      {
        id: '10',
        name: 'Zucchini',
        description: 'Tender zucchini, great for grilling and sautéing.',
        mainImage: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
        additionalImages: ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400'],
        unit: 'Kg',
        quantity: 1,
        price: 95,
        discountPrice: 80,
        stock: 55,
        tags: ['fresh', 'organic']
      }
    ]
  };
  
  return samples[subcategoryId] || [];
};

export default function SubcategoryProducts() {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    mainImage: '',
    additionalImages: [],
    unit: 'Kg',
    quantity: 1,
    price: 0,
    discountPrice: undefined,
    stock: 0,
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');

  // Find category and subcategory
  const category = categories.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);

  // Load products from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allProducts: Record<string, Product[]> = JSON.parse(stored);
        const key = `${categoryId}::${subcategoryId}`;
        if (allProducts[key]) {
          setProducts(allProducts[key]);
        } else {
          // Load sample products if no stored products
          const samples = getSampleProducts(subcategoryId || '');
          setProducts(samples);
          saveProducts(samples);
        }
      } catch (e) {
        console.error('Failed to load products', e);
        const samples = getSampleProducts(subcategoryId || '');
        setProducts(samples);
        saveProducts(samples);
      }
    } else {
      // First time - load sample products
      const samples = getSampleProducts(subcategoryId || '');
      setProducts(samples);
      saveProducts(samples);
    }
  }, [categoryId, subcategoryId]);

  const saveProducts = (productsToSave: Product[]) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProducts: Record<string, Product[]> = stored ? JSON.parse(stored) : {};
    const key = `${categoryId}::${subcategoryId}`;
    allProducts[key] = productsToSave;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name || '',
      description: formData.description || '',
      mainImage: formData.mainImage || '',
      additionalImages: formData.additionalImages || [],
      unit: formData.unit || 'Kg',
      quantity: formData.quantity || 1,
      price: formData.price || 0,
      discountPrice: formData.discountPrice,
      stock: formData.stock || 0,
      tags: formData.tags || []
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      mainImage: '',
      additionalImages: [],
      unit: 'Kg',
      quantity: 1,
      price: 0,
      discountPrice: undefined,
      stock: 0,
      tags: []
    });
    setShowForm(false);
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setShowPreview(true);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  const addImage = () => {
    if (newImage.trim() && !formData.additionalImages?.includes(newImage.trim())) {
      setFormData({
        ...formData,
        additionalImages: [...(formData.additionalImages || []), newImage.trim()]
      });
      setNewImage('');
    }
  };

  const removeImage = (image: string) => {
    setFormData({
      ...formData,
      additionalImages: formData.additionalImages?.filter(img => img !== image) || []
    });
  };

  if (!category || !subcategory) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Category or subcategory not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)' }}>
            {subcategory.name}
          </h2>
          <p className="text-sm text-muted-foreground">{category.name} • {subcategory.name}</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="glass-card border-white/20 hover:border-indigo-500/50 transition-all cursor-pointer group"
              onClick={() => handlePreview(product)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                  {product.discountPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{product.quantity} {product.unit}</span>
                    <span>•</span>
                    <span>Stock: {product.stock}</span>
                  </div>
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Product Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Product - {subcategory.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value: 'Kg' | 'Gram' | 'Pieces') => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kg">Kg</SelectItem>
                    <SelectItem value="Gram">Gram</SelectItem>
                    <SelectItem value="Pieces">Pieces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainImage">Main Image URL *</Label>
              <Input
                id="mainImage"
                type="url"
                value={formData.mainImage}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Images</Label>
              <div className="flex gap-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Image URL"
                  type="url"
                />
                <Button type="button" onClick={addImage} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.additionalImages && formData.additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.additionalImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Additional ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                <Input
                  id="discountPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discountPrice || ''}
                  onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag (fresh, organic, seasonal)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500">
                Create Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewProduct && <ProductPreview product={previewProduct} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

