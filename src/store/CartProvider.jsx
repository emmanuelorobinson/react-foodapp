import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        //check if item is already in cart, if so, increase amount
        items: state.items.some((item) => item.id === action.payload.id)
          ? state.items.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  amount: item.amount + action.payload.amount,
                };
              }
              return item;
            })
          : [...state.items, action.payload],
        totalAmount: state.totalAmount + action.payload.price,
      };
    case "REMOVE_ITEM":
      //check if item is already in cart, if so, decrease amount
      //if amount is 0, remove item from cart
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.payload) {
              if (item.amount === 1) {
                return null;
              }
              return {
                ...item,
                amount: item.amount - 1,
              };
            }
            return item;
          })
          .filter((item) => item !== null),
        totalAmount:
          state.totalAmount -
          state.items.find((item) => item.id === action.payload).price,
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
