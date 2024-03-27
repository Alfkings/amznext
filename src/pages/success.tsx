import { resetCart } from "@/store/nextSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
const SuccessPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20">
      <h1 className="items-center justify-center text-2xl font-semibold text-hoverBg">
        Thank you for shopping in amz-next
      </h1>
      <Link
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300 justify-center items-center"
        href={"/"}
        onClick={() => dispatch(resetCart())}
      >
        <p>Continue Shopping</p>
      </Link>
    </div>
  );
};

export default SuccessPage;
