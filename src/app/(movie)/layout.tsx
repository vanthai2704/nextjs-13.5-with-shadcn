import Header from "@/components/header";
import React, { PropsWithChildren } from "react";

const MoviesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MoviesLayout;
