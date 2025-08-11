
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/language-context";
import { getProducts, getCustomerRequests, addProduct, updateProduct, deleteProduct, getSpecialRequests } from "@/lib/data";
import type { Product, CustomerRequest, SpecialRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { PlusCircle, Edit, Trash2, Package, Eye } from "lucide-react";

export default function AdminPage() {
  const { t, p } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [specialRequests, setSpecialRequests] = useState<SpecialRequest[]>([]);
  
  // State for Address Dialog
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);

  // State for Add New Product
  const [newProduct, setNewProduct] = useState<{name: string, price: number | '', description: string, imageUrl: string, aiHint: string, type: string, stock: number | ''}>({
    name: "",
    price: 0,
    description: "",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "new product",
    type: "Milk",
    stock: 100,
  });

  // State for Update Product Price
  const [updatePriceData, setUpdatePriceData] = useState<{productId: string, newPrice: number | ''}>({
    productId: "",
    newPrice: '',
  });
  
  // State for Delete Product
  const [deleteProductId, setDeleteProductId] = useState("");


  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const fetchProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  const fetchCustomerRequests = async () => {
    const requestsData = await getCustomerRequests();
    setRequests(requestsData);
  }
  
  const fetchSpecialRequests = async () => {
    const requestsData = await getSpecialRequests();
    setSpecialRequests(requestsData);
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomerRequests();
    fetchSpecialRequests();

    const intervalId = setInterval(() => {
      fetchCustomerRequests();
      fetchSpecialRequests();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
  const handleAddNewProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.stock) {
      toast({ variant: "destructive", title: t('toastMissingFieldsTitle'), description: t('toastMissingFieldsDescription') });
      return;
    }
    await addProduct({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
    });
    toast({ title: t('toastProductAddedTitle'), description: t('toastProductAddedDescription', { productName: newProduct.name }) });
    await fetchProducts();
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "new product",
      type: "Milk",
      stock: 100,
    });
  };

  const handleUpdatePrice = async () => {
    if (!updatePriceData.productId || (updatePriceData.newPrice !== '' && updatePriceData.newPrice <= 0)) {
      toast({ variant: "destructive", title: t('toastInvalidDataTitle'), description: t('toastInvalidDataDescription') });
      return;
    }
    const productToUpdate = products.find(p => p.id === updatePriceData.productId);
    if (productToUpdate) {
      await updateProduct({ ...productToUpdate, price: Number(updatePriceData.newPrice) });
      toast({ title: t('toastPriceUpdatedTitle'), description: t('toastPriceUpdatedDescription', { productName: p(productToUpdate, 'name') }) });
      await fetchProducts();
      setUpdatePriceData({ productId: "", newPrice: '' });
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) {
       toast({ variant: "destructive", title: t('toastNoProductSelectedTitle'), description: t('toastNoProductSelectedDescription') });
      return;
    }
    await deleteProduct(deleteProductId);
    toast({ title: t('toastProductDeletedTitle'), description: t('toastProductDeletedDescription') });
    await fetchProducts();
    setDeleteProductId("");
  };
  
  const handleViewAddress = (request: CustomerRequest) => {
    setSelectedRequest(request);
    setIsAddressDialogOpen(true);
  };
  
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
          <p className="text-muted-foreground">{t('adminDashboardManage')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add New Product Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('addNewProduct')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productName">{t('productName')}</Label>
                  <Input id="productName" placeholder={t('productNamePlaceholder')} value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
                </div>
                <div>
                  <Label htmlFor="productDescription">{t('productDescription')}</Label>
                  <Textarea id="productDescription" placeholder={t('productDescriptionPlaceholder')} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}/>
                </div>
                <div>
                  <Label htmlFor="price">{t('priceLabel')}</Label>
                  <Input id="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value === '' ? '' : Number(e.target.value) })} />
                </div>
                <div>
                  <Label htmlFor="stock">{t('quantityLabel')}</Label>
                  <Input id="stock" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value === '' ? '' : Number(e.target.value) })} />
                </div>
                <div>
                  <Label htmlFor="imageUrl">{t('imageUrl')}</Label>
                  <Input id="imageUrl" placeholder="https://placehold.co/600x400.png" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}/>
                </div>
                <Button onClick={handleAddNewProduct}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t('addProduct')}
                </Button>
              </CardContent>
            </Card>

            {/* Update Product Price Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('updateProductPrice')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('product')}</Label>
                  <Select value={updatePriceData.productId} onValueChange={(value) => setUpdatePriceData({ ...updatePriceData, productId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectProductToUpdate')} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.id}>{p(product, 'name')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="newPrice">{t('newPrice')}</Label>
                  <Input id="newPrice" type="number" value={updatePriceData.newPrice} onChange={(e) => setUpdatePriceData({ ...updatePriceData, newPrice: e.target.value === '' ? '' : Number(e.target.value) })} />
                </div>
                <Button onClick={handleUpdatePrice}>
                  <Edit className="mr-2 h-4 w-4" /> {t('updatePrice')}
                </Button>
              </CardContent>
            </Card>
            
            {/* Delete Product Card */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">{t('deleteProductTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('productToDelete')}</Label>
                  <Select value={deleteProductId} onValueChange={setDeleteProductId}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectProductToDelete')} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.id}>{p(product, 'name')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('deleteProductBtn')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('productBookings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('customer')}</TableHead>
                      <TableHead>{t('product')}</TableHead>
                      <TableHead>{t('delivery')}</TableHead>
                      <TableHead className="text-right">{t('qty')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody suppressHydrationWarning>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.customerName}</TableCell>
                        <TableCell>{p(request, 'productName')}</TableCell>
                        <TableCell>{t(request.deliveryType.toLowerCase().replace(' ', ''))}</TableCell>
                        <TableCell className="text-right">{request.quantity}</TableCell>
                        <TableCell className="text-right">
                          {request.deliveryType === 'Home Delivery' && (
                            <Button variant="outline" size="icon" onClick={() => handleViewAddress(request)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                  <CardTitle>{t('customerRequests')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                  {specialRequests.length > 0 ? (
                      specialRequests.map(request => (
                          <div key={request.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background">
                              <Package className="h-6 w-6 text-muted-foreground" />
                              <div className="flex-grow">
                                  <p className="font-medium">{request.requestDetails}</p>
                                  <p className="text-sm text-muted-foreground">{t('from')} {request.customerName}</p>
                              </div>
                          </div>
                      ))
                  ) : (
                      <p className="text-muted-foreground text-center py-4">{t('noSpecialRequests')}</p>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Address Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('deliveryAddress')}</DialogTitle>
            <DialogDescription>
              {t('addressForCustomer')} <strong>{selectedRequest?.customerName}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="p-4 border rounded-md bg-muted text-muted-foreground">
              {selectedRequest?.address || t('noAddressProvided')}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddressDialogOpen(false)}>{t('close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
