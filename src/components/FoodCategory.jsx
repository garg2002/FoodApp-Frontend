import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addToCart} from'../redux-toolkit/cartSlice'
const FoodCategory = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const foodDetail = products.find(product => product.id === parseInt(params.id));

  const handleAddToCart = () => {
    dispatch(addToCart(foodDetail));
  }

  return (
    <div className="w-full h-full p-4 mt-12">
      <h1 className="text-slate-800 text-2xl md:text-[44px] md:ml-12 font-bold mb-6 tracking-wide">
        Product Data
      </h1>

      {/* Display restaurant cards */}

      <div className="mt-12 w-2/4 h-full mx-auto bg-[#ffffff] mb-8">
        <div className="flex justify-between">
          <div className="w-1/2">
            <img src={foodDetail.imageURL} alt="" />
          </div>
          <div className="text-black py-4 px-2 font-bold flex flex-col justify-start items-start my-auto">
            <h1 className="text-4xl p-4 py-2">{foodDetail.name}</h1>
            <p className="text-2xl p-4 py-2">₹{foodDetail.price}</p>
            <p className="text-xl p-4 font-medium">{foodDetail.description}</p>
            <button
              onClick={handleAddToCart}
              className="text-xl px-8 ml-4 cursor-pointer py-2 font-bold hover:bg-yellow-400 bg-emerald-500 text-white rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategory;
