import React, { useEffect, useState } from 'react';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories/');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchCategories();
  }, [categories]);

  const deleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
      });
      setCategories(categories.filter((category) => category._id !== id));
    } catch (err) {
      console.error(err)
    }
  };

 
  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f0f8ff', 
    }}>
      <h2 style={{
        color: '#007BFF', 
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        Categories
      </h2>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
      }}>
        {categories.map((category) => (
          <li key={category._id} style={{
            backgroundColor: '#ffffff',
            border: '1px solid #007BFF',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px',
            boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)', 
          }}>
            <img 
            src={`http://localhost:5000/${category.image}`}
            height={50}
            width={50}
            />
            <h3 style={{
              fontSize: '20px',
              color: '#0056b3',
              marginBottom: '10px',
            }}>
              {category.name}
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#555555', 
            }}>
              Subcategories: {category.subcategories.join(', ')}
            </p>
            <button
              style={{
                backgroundColor: '#007BFF', 
                color: '#ffffff',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => deleteCategory(category._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
