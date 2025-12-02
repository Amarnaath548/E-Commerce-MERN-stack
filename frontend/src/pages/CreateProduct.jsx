import { useState } from "react";
import useFetch from "../CustomHook/UseFetch";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import axios from "axios";

// Helper component for displaying form errors
const FormError = ({ message }) => (
  <p className="text-red-600 text-sm mt-1 **font-medium**">
    {message}
  </p>
);

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });

  const [formError, setFormError] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const url = `${baseUrl}/categories`;
  const { data: categories, loading, error } = useFetch(url);

 
  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
   
    const value = e.target.value;
    setFormData({ ...formData, price: value === "" ? "" : Number(value) });
  };

  const handleImageChange = (e) => {
    
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

 
  const validation = () => {
    const errors = { title: "", price: "", description: "", category: "", images: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Product Name is required.";
      isValid = false;
    }
    if (formData.price === 0 || formData.price === "") {
      errors.price = "Price must be greater than zero.";
      isValid = false;
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
      isValid = false;
    }
    if (!formData.category) {
      errors.category = "Please select a category.";
      isValid = false;
    }
    if (formData.images.length !== 3) {
      errors.images = "Please upload exactly 3 images.";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  
  const createProduct = async () => {
    console.log(formData)
    const form = new FormData();
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("category", formData.category);
    
    
    formData.images.forEach((image) => {
      form.append("images", image);
    });
    console.log(form)
    const accessToken=localStorage.getItem("accessToken")

    try {
      const { data } = await axios.post(`${baseUrl}/products`, form, {
        headers: {
         Authorization : `Bearer ${accessToken}`,
        },
      });
      console.log("Product Created:", data);
      setSubmissionMessage("Product created successfully!");
      
      setFormData({ title: "", price: "", description: "", category: "", images: [] });

    } catch (error) {
      console.error("Error creating product:", error);
      setSubmissionMessage("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage("");
    if (validation()) {
      setIsSubmitting(true);
      await createProduct();
    }
  };

 
  if (error) return <ErrorComponent error={error} />;
  if (loading) return <Loading data="categories" />;

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>
      
      {submissionMessage && (
        <div className={`p-4 mb-4 rounded-lg text-white font-semibold ${submissionMessage.includes("successfully") ? "**bg-green-500**" : "**bg-red-500**"}`}>
          {submissionMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-4 border border-gray-100">
        
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            type="text" 
            name="title" // Changed to 'title' to match state key
            id="title" 
            value={formData.title}
            onChange={handleTextChange}
            maxLength="100"
          />
          <FormError message={formError.title} />
        </div>
        
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input 
            type="number" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out" 
            name="price" 
            id="price" 
            value={formData.price}
            onChange={handlePriceChange} 
            min="0" 
          />
          <FormError message={formError.price} />
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            name="description" 
            rows="4"
            value={formData.description}
            onChange={handleTextChange}
            maxLength="1000"
          ></textarea>
          <FormError message={formError.description} />
        </div>
        
      
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            name="category" 
            id="category"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={formData.category}
            onChange={handleTextChange}
          >
            <option value="" disabled>Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <FormError message={formError.category} />
        </div>
        
        {/* Images Upload */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Images (Upload 3)</label>
          <input 
            type="file" 
            className="w-full text-gray-700** file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
            accept="image/*" 
            multiple 
            id="images" 
            name="images" 
          />
          {formData.images.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">Selected: {formData.images.length} file(s)</p>
          )}
          <FormError message={formError.images} />
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 mt-4 rounded-lg text-white font-semibold shadow-md transition duration-150 ease-in-out ${
            isSubmitting 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          }`}
        >
          {isSubmitting ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;