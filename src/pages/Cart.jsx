import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux-toolkit/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div
      className="relative min-w-3/4 h-screen"
      
    >
      {/* <Link to="/" onClick={handleClose}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />
      </Link> */}
      {/* <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden"> */}
          <div className="pointer-events-none  right-0 flex min-w-full min-h-full ">
            <div className="pointer-events-auto w-screen min-w-full transform transition duration-500 ease-in-out sm:duration-700">
              <div className="flex h-full  bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </div>
                    {/* <Link to="/">
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Link> */}
                  </div>

                  {cart.length === 0 ? (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        Your cart is empty
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add something to your cart to checkout.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.imageURL}
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">₹{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.description}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDecrementQuantity(product.id)
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      -
                                    </button>
                                    <p className="mx-2">{product.quantity}</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleIncrementQuantity(product.id)
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-500"
                                    onClick={() =>
                                      handleRemoveFromCart(product.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      ₹
                      {cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <Link to='/'>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping{" "}
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        {/* </div>
      </div> */}
    </div>
  );
};

export default Cart;
