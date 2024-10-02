import React, { useState } from 'react';

const AddCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [subcategories, setSubcategories] = useState(['']);
    const [image, setImage] = useState(null); 

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, '']);
    };

    const handleSubcategoryChange = (index, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index] = value;
        setSubcategories(updatedSubcategories);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', categoryName);
        formData.append('subcategories', JSON.stringify(subcategories)); 
        if (image) {
            formData.append('image', image); 
        }

        try {
            const response = await fetch('http://localhost:5000/api/categories/', {
                method: 'POST',
                body: formData, 
            });

            if (response.ok) {
                alert('Category added successfully');
                setShowModal(false);
                setCategoryName('');
                setSubcategories(['']);
                setImage(null);
            } else {
                const errorData = await response.json();
                console.error('Failed to add category:', errorData);
                alert(errorData);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 10,
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Add Category
            </button>

            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            width: '400px',
                            textAlign: 'center'
                        }}
                    >
                        <h2>Add Category</h2>

                        <label style={{ display: 'block', marginBottom: '10px' }}>Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
                        />

                        <label style={{ display: 'block', marginBottom: '10px' }}>Subcategories</label>
                        {subcategories.map((subcategory, index) => (
                            <input
                                key={index}
                                type="text"
                                value={subcategory}
                                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
                            />
                        ))}

                        <button
                            onClick={handleAddSubcategory}
                            style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '10px'
                            }}
                        >
                            Add Subcategory
                        </button>

                        <label style={{ display: 'block', marginBottom: '10px' }}>Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
                        />

                        <div>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginRight: '10px'
                                }}
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCategory;
