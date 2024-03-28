import React, { useEffect, useState } from "react";
import SearchProducts from "./SearchProducts";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import { HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";

const SearchBar = () => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);
  return (
    <div className="relative z-50 items-center justify-between flex-1 h-10 lg:inline-flex ">
      <input
        onChange={handleSearch}
        value={searchQuery}
        className="w-full h-full rounded-md border-r-0 px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
        type="text"
        placeholder="Search products"
      />
      <div className="absolute top-0 right-0 items-center justify-center w-12 h-full mx-auto text-2xl text-black bg-amazon_yellow rounded-tr-md rounded-br-md">
        <span className="absolute right-[10px] top-[9px]">
          <HiOutlineSearch />
        </span>
      </div>
      {/* ========== Searchfield ========== */}
      {searchQuery && (
        <div className="absolute left-0 w-full mx-auto overflow-y-scroll text-black bg-gray-200 rounded-lg cursor-pointer top-12 max-h-96">
          {filteredProducts.length > 0 ? (
            <>
              {searchQuery &&
                filteredProducts.map((item: StoreProduct) => (
                  <Link
                    key={item._id}
                    className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                    href={{
                      pathname: `${item._id}`,
                      query: {
                        _id: item._id,
                        brand: item.brand,
                        category: item.category,
                        description: item.description,
                        image: item.image,
                        isNew: item.isNew,
                        oldPrice: item.oldPrice,
                        price: item.price,
                        title: item.title,
                      },
                    }}
                    onClick={() => setSearchQuery("")}
                  >
                    <div className="w-full">
                      <SearchProducts item={item} />
                    </div>
                  </Link>
                ))}
            </>
          ) : (
            <div className="flex items-center justify-center py-10 rounded-lg shadow-lg bg-gray-50">
              <p className="text-xl font-semibold animate-bounce">
                Nothing is matches with your search keywords. Please try again!
              </p>
            </div>
          )}
        </div>
      )}
      {/* ========== Searchfield ========== */}
    </div>
  );
};

export default SearchBar;
