import React from "react";

interface CardHeaderPropsType {
  children: React.ReactElement | string;
}

function CardHeader({ children }: CardHeaderPropsType) {
  return <h2 className="text-lg font-bold mb-4">{children}</h2>;
}

export default CardHeader;
