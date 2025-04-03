import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FilePenLine, Trash } from "lucide-react";
import { toast } from "react-toastify";

// Import UI components
import { CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Import redux function
import {
  deleteProduct,
  updateProduct,
  fetchProducts,
} from "../../features/products/productsSlice";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products } = useSelector((state) => state.productsR);

  // State for editing product
  const [editProduct, setEditProduct] = useState(null);

  // Handle edit button click
  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditProduct(productToEdit);
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.warning("Product deleted!");
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(editProduct));
    toast.info("product updated successfully!");
    setEditProduct(null);
  };

  return (
    <section className="px-6 py-8 h-[500px]">
      <CardTitle className="text-center text-lg font-medium">
        Products
      </CardTitle>

      {/* Display Products */}
      {products?.length ? (
        <table className="table-auto w-full border cursor-pointer text-gray-800 mt-8">
          <thead>
            <tr className="border text-sm w-full">
              <th className="border py-3 font-medium">S.No</th>
              <th className="border py-3 font-medium">Image</th>
              <th className="border py-3 font-medium">Title</th>
              <th className="border py-3 font-medium">Category</th>
              <th className="border py-3 font-medium">Price</th>
              <th className="border py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const { id, thumbnail, title, category, price } = item;
              return (
                <tr key={id} className="border w-full text-sm text-center">
                  <td className="border py-1">{index + 1}</td>
                  <td className="p-1 lg:px-0 flex justify-center items-center">
                    <img src={thumbnail} alt={title} className="w-12 h-12" />
                  </td>
                  <td className="border py-1">{title.slice(0, 35)}</td>
                  <td className="border py-1">{category}</td>
                  <td className="border py-1">{price}</td>
                  <td className="border py-1">
                    {/* Edit Button */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {/* edit button */}
                        <Button
                          variant="outline"
                          className="p-0 border-none bg-none hover:bg-transparent"
                          onClick={() => handleEdit(id)}
                        >
                          <FilePenLine />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Edit Product</AlertDialogTitle>
                        {editProduct && (
                          <form
                            className="flex flex-col gap-y-2"
                            onSubmit={handleSubmit}
                          >
                            <div className="flex gap-x-2 items-center">
                              <Label>Title:</Label>
                              <Input
                                name="title"
                                type="text"
                                value={editProduct.title}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Link:</Label>
                              <Input
                                name="thumbnail"
                                type="text"
                                value={editProduct.thumbnail}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Brand:</Label>
                              <Input
                                name="brand"
                                type="text"
                                value={editProduct.brand}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Cate:</Label>
                              <Input
                                name="category"
                                type="text"
                                value={editProduct.category}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Tags:</Label>
                              <Input
                                name="tags"
                                type="text"
                                value={editProduct.tags}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Stock:</Label>
                              <Input
                                name="stock"
                                type="number"
                                value={editProduct.stock}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2 items-center">
                              <Label>Price:</Label>
                              <Input
                                name="price"
                                type="number"
                                value={editProduct.price}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                              />
                            </div>

                            <div className="flex gap-x-2">
                              <Label>Desc:</Label>
                              <Textarea
                                name="description"
                                value={editProduct.description}
                                onChange={handleChange}
                                className="focus-visible:ring-0"
                                rows={6}
                              />
                            </div>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction type="submit">
                                Done
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </form>
                        )}
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* delete button */}
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(id)}
                      className="p-0 border-none bg-none hover:bg-transparent ml-4"
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="md:text-lg text-gray-700 text-center my-[50%] md:my-[25%] lg:my-[20%] flex items-center justify-center">
          Loading...
        </p>
      )}
    </section>
  );
};

export default Products;
