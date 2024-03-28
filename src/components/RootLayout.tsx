import React, { ReactElement } from "react";
import Header from "./header/Header";
import BottomHeader from "./header/BottomHeader";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

interface Props {
  children: ReactElement;
}

const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="block w-full lg:hidden bg-amazon_blue">
        <SearchBar />
      </div>

      <BottomHeader />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
