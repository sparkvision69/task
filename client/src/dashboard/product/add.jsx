import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    price: '',
    categories: '',
    subcategories: ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();

        
        const parsedCategories = data.map(category => ({
          ...category,
          subcategories: JSON.parse(category.subcategories[0]) 
        }));

        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    setFormData({
      ...formData,
      categories: selectedCat
    });
    setSelectedSubcategory(''); 
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setFormData({
      ...formData,
      subcategories: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('title', formData.title);
    productData.append('image', formData.image);
    productData.append('price', formData.price);
    productData.append('categories', formData.categories);
    productData.append('subcategories', formData.subcategories);

    try {
      const response = await fetch('http://localhost:5000/api/products/', {
        method: 'POST',
        body: productData
      });

      if (response.ok) {
        alert('Product added successfully!');
        setShowForm(false);
        setFormData({
          title: '',
          image: null,
          price: '',
          categories: '',
          subcategories: ''
        });
        setSelectedCategory('');
        setSelectedSubcategory('');
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          marginTop: 10,
          marginLeft: 10
        }}
        onClick={() => setShowForm(true)}
      >
        Add Product
      </button>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '10px',
              width: '400px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}
          >
            <h2
              style={{
                color: '#007bff',
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              Add Product
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  accept="image/*"
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Categories:</label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Subcategories:</label>
                <select
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  required
                >
                  <option value="">Select a subcategory</option>
                  {selectedCategory && categories
                    .find(cat => cat.name === selectedCategory)
                    ?.subcategories.map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                </select>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
