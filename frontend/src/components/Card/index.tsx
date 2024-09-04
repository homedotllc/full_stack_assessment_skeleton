import React, { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <>
      <article className="hover:animate-background flex bg-white  rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="rounded-[10px] flex-grow bg-white p-4">{children}</div>
      </article>
    </>
  )
}

export default Card
