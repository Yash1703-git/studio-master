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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('adminDashboard')}</h1>
      
      <div className="mb-4">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingProduct(null);
              }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit}>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="name">Name (EN)</Label>
                  <Input id="name" name="name" defaultValue={editingProduct?.name} />
                   <Label htmlFor="name_mr">Name (MR)</Label>
                  <Input id="name_mr" name="name_mr" defaultValue={editingProduct?.translations?.mr?.name} />
                   <Label htmlFor="description">Description (EN)</Label>
                  <Input id="description" name="description" defaultValue={editingProduct?.description} />
                  <Label htmlFor="description_mr">Description (MR)</Label>
                  <Input id="description_mr" name="description_mr" defaultValue={editingProduct?.translations?.mr?.description} />
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} />
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} />
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" name="type" defaultValue={editingProduct?.type} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(product.id as string)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
