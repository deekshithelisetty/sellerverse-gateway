import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, CheckCircle2, XCircle, Play, Check, X, Edit, Trash2, Power } from 'lucide-react';
import { toast } from 'sonner';

interface Webhook {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
}

export default function Hookpoint() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    { id: '1', name: 'Order Webhook', url: 'https://api.example.com/webhooks/orders', status: 'active' },
    { id: '2', name: 'Payment Webhook', url: 'https://api.example.com/webhooks/payments', status: 'active' },
    { id: '3', name: 'Inventory Webhook', url: 'https://api.example.com/webhooks/inventory', status: 'active' },
    { id: '4', name: 'Shipping Webhook', url: 'https://api.example.com/webhooks/shipping', status: 'inactive' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null);
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleAddWebhook = () => {
    if (!webhookName.trim() || !webhookUrl.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(webhookUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    if (editingWebhook) {
      // Update existing webhook
      setWebhooks(webhooks.map(w => 
        w.id === editingWebhook.id 
          ? { ...w, name: webhookName.trim(), url: webhookUrl.trim() }
          : w
      ));
      toast.success(`Webhook "${webhookName.trim()}" updated successfully`);
    } else {
      // Add new webhook
      const newWebhook: Webhook = {
        id: Date.now().toString(),
        name: webhookName.trim(),
        url: webhookUrl.trim(),
        status: 'active',
      };
      setWebhooks([...webhooks, newWebhook]);
      toast.success(`Webhook "${newWebhook.name}" added successfully`);
    }

    setWebhookName('');
    setWebhookUrl('');
    setEditingWebhook(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (webhook: Webhook) => {
    setEditingWebhook(webhook);
    setWebhookName(webhook.name);
    setWebhookUrl(webhook.url);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (webhookId: string) => {
    setWebhooks(webhooks.map(w => 
      w.id === webhookId 
        ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
        : w
    ));
    const webhook = webhooks.find(w => w.id === webhookId);
    toast.success(`Webhook "${webhook?.name}" ${webhook?.status === 'active' ? 'deactivated' : 'activated'}`);
  };

  const handleDelete = (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    setWebhooks(webhooks.filter(w => w.id !== webhookId));
    toast.success(`Webhook "${webhook?.name}" deleted successfully`);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter a URL first');
      return;
    }

    try {
      new URL(webhookUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsTesting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTesting(false);
    toast.success('Webhook test successful!');
  };

  const handleCancel = () => {
    setWebhookName('');
    setWebhookUrl('');
    setEditingWebhook(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold mb-1 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #FF512F, #DD2476)' }}>
            Hookpoint
          </h2>
          <p className="text-sm text-muted-foreground">Manage your webhooks and integrations</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          size="sm"
          className="h-9 px-3 gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Add New Webhook
        </Button>
      </div>

      {/* Webhooks List - Columns Layout */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {webhooks.map((webhook, index) => (
            <Card 
              key={webhook.id} 
              className="glass-card border-white/20"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #FF512F, #DD2476)' }}>{webhook.name}</h3>
                      {webhook.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-red-500">
                          <XCircle className="h-3.5 w-3.5" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground break-all mb-4 flex-1">{webhook.url}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 flex-1"
                      onClick={() => handleEdit(webhook)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 flex-1"
                      onClick={() => handleToggleStatus(webhook.id)}
                    >
                      <Power className="h-3.5 w-3.5 mr-1.5" />
                      {webhook.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={() => handleDelete(webhook.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Webhook Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-white/20 p-4 max-w-sm" style={{ background: 'linear-gradient(to right, #FF512F, #DD2476)' }}>
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg text-white">{editingWebhook ? 'Edit Webhook' : 'Add New Webhook'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="webhook-name" className="text-sm text-white">Webhook Name</Label>
              <Input
                id="webhook-name"
                placeholder="Enter webhook name"
                value={webhookName}
                onChange={(e) => setWebhookName(e.target.value)}
                className="h-9 bg-white/90 border-white/30"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="webhook-url" className="text-sm text-white">URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://api.example.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="h-9 bg-white/90 border-white/30"
              />
            </div>
          </div>
          <DialogFooter className="pt-2 gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel} 
              size="sm" 
              className="h-9 bg-white/20 border-white/30 text-white hover:bg-white hover:text-orange-600 flex items-center justify-center"
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Cancel
            </Button>
            <Button
              onClick={handleTestWebhook}
              size="sm"
              variant="outline"
              className="h-9 bg-white/20 border-white/30 text-white hover:bg-white hover:text-orange-600 flex items-center justify-center"
              disabled={isTesting}
            >
              <Play className="h-3.5 w-3.5 mr-1.5" />
              {isTesting ? 'Testing...' : 'Test'}
            </Button>
            <Button 
              onClick={handleAddWebhook} 
              size="sm" 
              className="h-9 bg-white text-orange-600 hover:bg-white/90 flex items-center justify-center"
            >
              <Check className="h-3.5 w-3.5 mr-1.5" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

