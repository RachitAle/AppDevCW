"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useBookContext } from "./context/BookContext";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useBookContext();
  const [quantities, setQuantities] = useState(
    cart
      ? cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
      : {}
  );

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities({ ...quantities, [bookId]: newQuantity });
  };

  const updateCart = () => {
    cart.forEach((item) => {
      if (quantities[item.id] !== item.quantity) {
        updateCartItem(item.id, quantities[item.id]);
      }
    });
  };

  const calculateTotal = () => {
    return cart
      ? cart.reduce(
          (total, item) => total + item.price * (quantities[item.id] || 1),
          0
        )
      : 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-black">Your Items</h1>
            <span className="text-sm text-gray-500">
              {cart ? cart.length : 0} items in your cart
            </span>
          </div>

          {!cart || cart.length === 0 ? (
            <div className="bg-white rounded-lg p-16 text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-full h-full text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-600 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Link
                to="/books"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="border-b bg-gray-50 py-4 px-6 hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500">
                    <div className="md:col-span-6">Book Details</div>
                    <div className="md:col-span-2 text-center">Price</div>
                    <div className="md:col-span-2 text-center">Quantity</div>
                    <div className="md:col-span-2 text-right">Total</div>
                  </div>

                  {cart &&
                    cart.map((book) => (
                      <div
                        key={book.id}
                        className="grid md:grid-cols-12 gap-4 items-center py-6 px-6 border-b"
                      >
                        <div className="md:col-span-6 flex items-center gap-4">
                          <button
                            onClick={() => removeFromCart(book.id)}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Remove item"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <div className="w-16 h-20 bg-gray-200 flex-shrink-0">
                            {book.coverImage ? (
                              <img
                                src={book.coverImage || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-black">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {book.author || "Unknown author"}
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-2 text-center">
                          <span className="md:hidden text-gray-500 mr-2">
                            Price:
                          </span>
                          <span>Rs. {book.price}</span>
                        </div>

                        <div className="md:col-span-2 flex justify-center">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  book.id,
                                  quantities[book.id] - 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <input
                              type="text"
                              value={quantities[book.id]}
                              onChange={(e) =>
                                handleQuantityChange(
                                  book.id,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-12 text-center py-1 border-x"
                              aria-label="Quantity"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  book.id,
                                  quantities[book.id] + 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2 text-right">
                          <span className="md:hidden text-gray-500 mr-2">
                            Total:
                          </span>
                          <span className="font-medium">
                            Rs. {book.price * quantities[book.id]}
                          </span>
                        </div>
                      </div>
                    ))}

                  <div className="p-6 flex justify-between items-center bg-gray-50">
                    <Link
                      to="/books"
                      className="text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Continue Shopping
                    </Link>
                    <button
                      onClick={updateCart}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded font-medium"
                    >
                      Update Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-bold text-black mb-4">
                    Order Summary
                  </h2>
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        Rs. {calculateTotal()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>In store pickup</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-green-600">
                      Rs. {calculateTotal()}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-medium mb-3">
                    Place Order
                  </button>
                  <div className="text-xs text-center text-gray-500">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
