import { LuMenu } from "react-icons/lu";
import { StateProps } from "../../../type";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@/store/nextSlice";

const BottomHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };
  return (
    <div className="flex items-center w-full h-10 px-4 text-sm text-white bg-amazon_light">
      <p className="flex items-center h-8 gap-1 px-2 duration-300 border border-transparent cursor-pointer hover:border-white">
        <LuMenu className="text-xl" /> All
      </p>
      <p className="inline-flex items-center h-8 px-2 duration-300 border border-transparent cursor-pointer hover:border-white">
        Todays Deals
      </p>
      <p className="items-center hidden h-8 px-2 duration-300 border border-transparent cursor-pointer md:inline-flex hover:border-white">
        Customer Service
      </p>
      <p className="inline-flex items-center h-8 px-2 duration-300 border border-transparent cursor-pointer hover:border-white">
        Registry
      </p>
      <p className="items-center hidden h-8 px-2 duration-300 border border-transparent cursor-pointer md:inline-flex hover:border-white">
        Gift Cards
      </p>
      <p className="items-center hidden h-8 px-2 duration-300 border border-transparent cursor-pointer md:inline-flex hover:border-white">
        Sell
      </p>
      {userInfo && (
        <button
          onClick={handleSignOut}
          className="inline-flex items-center h-8 px-2 duration-300 border border-transparent cursor-pointer hover:border-red-600 hover:text-red-400 text-amazon_yellow"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default BottomHeader;
