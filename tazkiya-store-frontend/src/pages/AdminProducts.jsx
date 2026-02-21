import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.image || !form.category) {
      alert("Please fill all fields");
      return;
    }
    try {
      await API.post("/products", { ...form, price: Number(form.price) });
      setForm({ name: "", price: "", description: "", image: "", category: "" });
      fetchProducts();
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      alert("Failed to create product");
    }
  };

  
   const deleteProduct = async (id) => {
  try {

    await API.delete(`/products/${id}`);

    fetchProducts();
  } catch (err) {
    console.error("DELETE ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Delete failed");
  }
};
  
  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      <form onSubmit={createProduct} className="space-y-2 mb-5">
        <input
          placeholder="Name"
          value={form.name}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        
        <input
        placeholder="Category"
          value={form.category}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        
        
        <button type="submit" className="bg-black text-white px-4 py-2">
          Create Product
        </button>
      </form>

      {/* Product List */}
      {products.map((p) => (
        <div key={p._id} className="border p-3 mb-2 rounded">
          <h2 className="font-bold">{p.name}</h2>
          <p>৳{p.price}</p>
          <button
            className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
            // In your button onClick, log the ID first
onClick={() => {
   deleteProduct(p._id)
}}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;










