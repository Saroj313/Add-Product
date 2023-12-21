import React, { createContext, useReducer, useContext } from 'react';

const ProductStateContext = createContext();
const ProductDispatchContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    // Add other cases as needed
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, []);

  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
};

export const useProductState = () => {
  const context = useContext(ProductStateContext);
  if (context === undefined) {
    throw new Error('useProductState must be used within a ProductProvider');
  }
  return context;
};

export const useProductDispatch = () => {
  const context = useContext(ProductDispatchContext);
  if (context === undefined) {
    throw new Error('useProductDispatch must be used within a ProductProvider');
  }
  return context;
};
