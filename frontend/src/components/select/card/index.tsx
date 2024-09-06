import React from "react";
import CardFooter from "./Footer";
import CardHeader from "./Header";
import Modal from "../../modal";
import UserModal from "../../UserModal";

interface CardPropTypes {
  baths: number;
  beds: number;
  zip: string;
  state: string;
  sqft: number;
  street_address: string;
  list_price: number;
}

function Card({
  baths,
  beds,
  sqft,
  street_address,
  zip,
  state,
  list_price,
}: CardPropTypes) {
  return (
    <div className="w-[225px] p-5 bg-white rounded-lg shadow-md text-left">
      <CardHeader>{street_address}</CardHeader>

      <ul className="mb-4">
        <li className="text-sm">
          <p className="font-semibold inline-block">List Price:</p> {list_price}
        </li>
        <li className="text-sm">
          {" "}
          <p className="font-semibold inline-block">State:</p> {state}
        </li>
        <li className="text-sm">
          <p className="font-semibold inline-block">Zip:</p> {zip}
        </li>
        <li className="text-sm">
          {" "}
          <p className="font-semibold inline-block">Sqft:</p> {sqft}
        </li>
        <li className="text-sm">
          {" "}
          <p className="font-semibold inline-block">Beds: </p> {beds}
        </li>
        <li className="text-sm">
          {" "}
          <p className="font-semibold inline-block">Baths:</p> {baths}
        </li>
      </ul>
      <CardFooter>
        <Modal>
          <UserModal />
        </Modal>
      </CardFooter>
    </div>
  );
}

export default Card;
