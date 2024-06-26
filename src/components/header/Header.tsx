import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from "@/store/nextSlice";
import SearchProducts from "../SearchProducts";
import SearchBar from "../SearchBar";
const Header = () => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);

  // Search area
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
    <div className="sticky top-0 z-50 w-full h-20 xs:w-full bg-amazon_blue text-lightText">
      <div className="inline-flex items-center justify-between w-full h-full gap-1 px-4 mx-auto mdl:gap-3">
        {/* logo */}
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <Image
            className="object-cover mt-1 mdl:w-28 w-14 "
            src={logo}
            alt="logoImg"
          />
        </Link>
        {/* delivery */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="font-bold text-white uppercase">USA</p>
          </div>
        </div>
        {/* serchbar */}
        <div className="relative items-center justify-between flex-1 hidden h-10 lg:inline-flex">
          <SearchBar />
        </div>

        {/* signin */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={userInfo.image}
              alt="userImage"
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="flex-col justify-between hidden text-xs text-gray-100 mdl:flex">
              <p className="font-bold text-white">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 mdl:h-[70%] h-[60%]"
          >
            <p>Hello, sign in</p>
            <p className="flex items-center font-bold text-white">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* fovorite */}
        <Link
          href={"/favorite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="font-bold text-white">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-5 md:top-2 w-4 h-4  rounded-md  border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* cart */}
        <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] w-[40%] md:w-[15%] relative lg:w-auto"
        >
          <Image
            className="object-cover w-auto h-8"
            src={cartIcon}
            alt="cartImg"
          />
          <p className="mt-3 text-xs font-bold text-white">Cart</p>
          <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;

