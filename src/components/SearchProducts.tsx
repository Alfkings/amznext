import React from "react";
import FormattedPrice from "./FormattedPrice";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}
type Item = {
  item: Props;
};

const SearchProducts = ({ item }: Item) => {
  return (
    <div className="flex items-center mb-5 sm:gap-4">
      <img className="w-24" src={item.image} alt="productImage" />
      <div className="mt-5">
        <p className="-mb-1 text-xs">
          {item.brand}_{item.category}
        </p>
        <p className="text-base font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="flex items-center gap-1 text-sm">
          price:{" "}
          <span className="font-semibold">
            <FormattedPrice amount={item.price} />
          </span>
          <span className="text-gray-600 line-through">
            <FormattedPrice amount={item.oldPrice} />
          </span>
        </p>
      </div>
      <div className="flex-1 px-1 text-right sm:px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save <FormattedPrice amount={item.oldPrice - item.price} />
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;
