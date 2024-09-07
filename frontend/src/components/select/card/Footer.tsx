import React from "react";

interface CardFooterPropsType {
  children: React.ReactElement;
}

function CardFooter({ children }: CardFooterPropsType) {
  return <div>{children}</div>;
}

export default CardFooter;
