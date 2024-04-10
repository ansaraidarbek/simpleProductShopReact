import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import './styles.css';
import ProductCard from './ProductCard';

const ProductContext = createContext();

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [textStyle, setTextStyle] = useState('normal');
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products', {
        headers: {
          'app-id': '601f6b745d6ebfc98174820f'
        }
      });
      const data = await response.json();
      const products = data.products.slice(0, 5);
      const newProducts = products.map(el => {
        return {image:el.images[0], ...el}
      })
      setProducts(newProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      title: titleRef.current.value,
      brand: brandRef.current.value,
      image: imageRef.current.value,
      price: priceRef.current.value,
      discount: discountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    clearInputs();
  };

  const clearInputs = () => {
    titleRef.current.value = '';
    brandRef.current.value = '';
    imageRef.current.value = '';
    priceRef.current.value = '';
    discountRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  const sortProductsByPrice = () => {
    setSortByPriceAsc(!sortByPriceAsc);
    const sortedProducts = [...products].sort((a, b) => {
      return sortByPriceAsc ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
  };

  const titleRef = useRef(null);
  const brandRef = useRef(null);
  const imageRef = useRef(null);
  const priceRef = useRef(null);
  const discountRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const toggleTextStyleAndColor = () => {
    setTextStyle(textStyle === 'normal' ? 'italic' : 'normal');
    setTextColor(textColor === 'black' ? 'red' : 'black');
  };

  return (
    <ProductContext.Provider value={{ textStyle, textColor }}>
      <div className="container">
        <h1>Product Cards</h1>
        <div className='actions'>
        <button className="filter-btn" onClick={sortProductsByPrice}>Sort by Price</button>
        <button className="toggle-btn" onClick={toggleTextStyleAndColor}>Toggle Style & Color</button>
        </div>
        <div className="product-cards">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          <button className="add-btn" onClick={() => setShowModal(true)}>Add Product</button>
        </div>
        {showModal && (
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Add New Product</h2>
              <input type="text" ref={titleRef} placeholder="Title" />
              <input type="text" ref={brandRef} placeholder="Brand" />
              <input type="text" ref={imageRef} placeholder="Image URL" />
              <input type="text" ref={priceRef} placeholder="Price" />
              <input type="text" ref={discountRef} placeholder="Discount" />
              <input type="text" ref={descriptionRef} placeholder="Description" />
              <input type="text" ref={categoryRef} placeholder="Category" />
              <button onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
        )}
      </div>
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export default App;
export { useProductContext };
