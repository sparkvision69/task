import React, { useState, useEffect } from 'react';

function ProductList() {
  const [allProducts, setAllProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]); 
  const [sortOrder, setSortOrder] = useState('');
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch('http://localhost:5000/api/categories');
        if (!categoryResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const categoriesData = await categoryResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  
      try {
        const productResponse = await fetch('http://localhost:5000/api/products/');
        if (!productResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const productsData = await productResponse.json();
        setAllProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.categories.includes(selectedCategory));
    }
    
    filtered = filtered.filter(
      product => product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
    );
    
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, selectedPriceRange, sortOrder]);

  const filterByPrice = (minPrice, maxPrice) => {
    setSelectedPriceRange([minPrice, maxPrice]);
  };
  
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div style={{ display: 'flex', padding: '20px', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '300px', padding: '20px', borderRight: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '10px' }}>
        <h4 style={{ marginBottom: '20px' }}>Filters</h4>

        <div style={{ marginBottom: '20px' }}>
          <h5>Price Range</h5>
          <button
            onClick={() => filterByPrice(1000, 20000)}
            style={{
              display: 'block', padding: '10px', margin: '5px 0', width: '100%',
              backgroundColor: '#007bff', color: '#fff', border: 'none',
              borderRadius: '5px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            ₹1000 to ₹20000
          </button>
          <button
            onClick={() => filterByPrice(2000, 50000)}
            style={{
              display: 'block', padding: '10px', margin: '5px 0', width: '100%',
              backgroundColor: '#007bff', color: '#fff', border: 'none',
              borderRadius: '5px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            ₹2000 to ₹50000
          </button>
          <button
            onClick={() => filterByPrice(1000, 100000)}
            style={{
              display: 'block', padding: '10px', margin: '5px 0', width: '100%',
              backgroundColor: '#007bff', color: '#fff', border: 'none',
              borderRadius: '5px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            ₹50000 to ₹100000
          </button>
        </div>
      </div>

      <div style={{ flexGrow: 1, padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          {categories.slice(0, 3).map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                width: '150px', 
                marginRight: '20px',
                transition: 'background-color 0.3s ease',
                backgroundColor: selectedCategory === category.name ? '#007bff' : '#fff',
                color: selectedCategory === category.name ? '#fff' : '#000' 
              }}
            >
              <img
                src={`http://localhost:5000/${category.image}`}
                alt={category.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '50%', 
                  marginBottom: '10px'
                }}
              />
              {category.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <select
            onChange={handleSortChange}
            style={{
              padding: '10px', borderRadius: '5px', border: '1px solid #ddd',
              width: '200px'
            }}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        <h4 style={{ marginBottom: '20px' }}>Products</h4>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff', borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden',
                  width: '300px', textAlign: 'center', transition: 'transform 0.2s'
                }}
              >
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '18px', color: '#1a73e8', marginBottom: '8px' }}>
                    Price: ₹{item.price}
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    Category: {item.categories.join(', ')} 
                  </p>
                  <p style={{ fontSize: '14px', color: '#888' }}>
                    Subcategory: {item.subcategories.join(', ')} 
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
