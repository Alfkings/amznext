import { resetFavoriteData } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItems = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to reset your items from the cart?"
    );
    if (confirmReset) {
      dispatch(resetFavoriteData());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="h-10 font-semibold duration-300 bg-gray-200 rounded-lg w-44 hover:bg-red-600 hover:text-white"
    >
      reset favorites
    </button>
  );
};

export default ResetFavoriteItems;
