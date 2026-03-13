import { useEffect, useState, Fragment } from "react";
import API from "../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
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
    if (
      !form.name ||
      !form.price ||
      !form.description ||
      !form.image ||
      !form.category
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      await API.post("/products", { ...form, price: Number(form.price) });
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
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

  const updateProduct = async (id) => {
    await API.put(`/products/${id}`,form);
    fetchProducts();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      <form onSubmit={createProduct} className="space-y-2 mb-5">
        <input
          placeholder="Name"
          value={form.name}
          className="border rounded p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          className="border rounded p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          className="border rounded p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          className="border rounded p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          placeholder="Category"
          value={form.category}
          className="border rounded p-2 w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-sky-500 text-white rounded px-4 py-2"
        >
          Create Product
        </button>
      </form>

      {/* Product List */}
      {products.map((p) => (
        <div key={p._id} className="border p-3 mb-2 rounded">
          <h2 className="font-bold">{p.name}</h2>
          <p>৳{p.price}</p>

          <div className="flex gap-2">
            {confirmDelete ? (
              <Fragment>
                <button
                  className={`bg-sky-500 text-white px-2 py-1 mt-2 rounded ${showModal ? "hidden" : ""}`}
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    updateProduct(p._id);
                  }}
                >
                  Edit
                </button>

                <button
                  className={`bg-red-500 text-white px-2 py-1 mt-2 rounded ${showModal ? "hidden" : ""}`}
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                >
                  Delete
                </button>
              </Fragment>
            ) : (
              <div className="flex gap-2">
                <button
                  className={`bg-sky-500 text-white px-2 py-1 mt-2 rounded ${showModal ? "hidden" : ""}`}
                  onClick={() => {
                    deleteProduct(p._id);
                    setConfirmDelete(true);
                  }}
                >
                  Confirm
                </button>

                <button
                  className={`bg-red-500 text-white px-2 py-1 mt-2 rounded ${showModal ? "hidden" : ""}`}
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            {showModal && (
              <div className="grid gap-[3px] w-full">
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
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
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
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />

                <input
                  placeholder="Category"
                  value={form.category}
                  className="border p-2 w-full"
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />
                <div className="flex gap-[2px]">
                  <button className="bg-sky-400 text-white px-2 py-1 mt-2 rounded">
                    {" "}
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
                  >
                    {" "}
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
