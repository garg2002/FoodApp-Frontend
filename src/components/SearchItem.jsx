import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const SearchItem = () => {
  const [query, setQuery] = useState("");
  
  const { products } = useSelector((state) => state.products);
  const SearchedData = products.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()));


  return (
    <div className="w-full h-full py-4 ">
      <div className="w-full h-16  flex justify-center ">
        <input
          type="text"
          placeholder="Search Restaurants and Food"
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/3 h-full p-8 rounded-lg outline-none shadow-lg "
        />
      </div>
      {/* Data Display */}
      <div className="mt-2 w-full h-full bg-[#ffffff] mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-full h-full">
          {SearchedData?.map((product) => {
            return (
              <Link to={`/category/${product.id}`} key={product.id}>
                <div
                  className=" md:w-[300px] w-[220px] cursor-pointer bg-white   shadow-stone-400 rounded-md"
                  key={product?.id}
                >
                  <div className="w-full h-48">
                    <img
                      src={product.image}
                      alt=""
                      className="object-contain rounded-xl w-[220px] md:w-[450px] h-48 "
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
