"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchProducts = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Product[];
    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchProducts();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete product" });
    }
  };
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      type: formData.get("type") as string,
      stock: parseInt(formData.get("stock") as string),
      description: formData.get("description") as string,
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "product image",
      translations: {
        mr: {
            name: formData.get("name_mr") as string,
            description: formData.get("description_mr") as string
        }
      }
    };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id as string), productData);
        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast({ title: "Success", description: "Product added successfully" });
      }
      fetchProducts();
      setIsDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save product" });
    }
  };


  if (loading || !user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter font-lexend">{t('adminDashboard')}</h1>
        <p className="text-muted-foreground mt-2">Manage your products and view customer requests.</p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>View, add, edit, or delete your products.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setEditingProduct(null);
                }
            }}>
              <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2" />
                    Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name (EN)</Label>
                      <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="name_mr">Name (MR)</Label>
                      <Input id="name_mr" name="name_mr" defaultValue={editingProduct?.translations?.mr?.name} required />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="description">Description (EN)</Label>
                      <Input id="description" name="description" defaultValue={editingProduct?.description} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_mr">Description (MR)</Label>
                      <Input id="description_mr" name="description_mr" defaultValue={editingProduct?.translations?.mr?.description} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock</Label>
                          <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Input id="type" name="type" defaultValue={editingProduct?.type} placeholder="e.g. Cow Feed, Mineral Supplement" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Product</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product.id as string)}>
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
    </div>
  );
}
