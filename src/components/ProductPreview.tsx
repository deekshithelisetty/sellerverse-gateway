import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/pages/SubcategoryProducts';
import { Package, Tag, DollarSign, TrendingDown } from 'lucide-react';

interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product }: ProductPreviewProps) {
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-white/20">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
          }}
        />
        {product.discountPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-lg flex items-center gap-1">
            <TrendingDown className="h-4 w-4" />
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Additional Images */}
      {product.additionalImages && product.additionalImages.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {product.additionalImages.map((img, idx) => (
            <div key={idx} className="aspect-square overflow-hidden rounded-lg border border-white/20">
              <img
                src={img}
                alt={`Additional ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150?text=No+Image';
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)' }}>
            {product.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Price Section */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <DollarSign className="h-5 w-5 text-indigo-500" />
                <span className="text-3xl font-bold text-indigo-600">
                  ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-card border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Unit</span>
              </div>
              <p className="text-lg font-semibold">{product.unit}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Quantity</span>
              </div>
              <p className="text-lg font-semibold">{product.quantity} {product.unit}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Stock</span>
              </div>
              <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Price per {product.unit}</span>
              </div>
              <p className="text-lg font-semibold">₹{product.price}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <Card className="glass-card border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

