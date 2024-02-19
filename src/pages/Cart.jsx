/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { Minus } from "../svgs/Minus";
import { Plus } from "../svgs/Plus";
import { RightArrow } from "../svgs/RightArrow";
import { notify } from "../components/Toast";

// eslint-disable-next-line react/prop-types
export const Cart = ({ cartItems, handleMinus, handlePlus, handleRemove }) => {
  if (cartItems.length == 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold">You Have no Items!</h2>
        <NavLink to="/shop">
          {" "}
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500">
            Go Shopping
          </button>
        </NavLink>
      </div>
    );
  }

  const total = cartItems.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-center pt-4 text-2xl font-bold">
        You have {cartItems.length} cart Items
      </h1>
      <ul className="p-10 w-full flex flex-col gap-8 ">
        {cartItems.map((item) => (
          <li key={item.id} className="">
            <div className="w-full flex gap-4 items-center rounded-lg shadow-gray-700 shadow-lg border-gray-700 bg-gray-800">
              <img
                className="object-fit w-60 h-48"
                src={item.image}
                alt={item.image}
              />
              <div className="flex-1 flex flex-col px-4 leading-normal">
                <div>
                  <h5 className="mb-2 text-lg text-gray-200 font-semibold tracking-tight ">
                    {item.title}
                  </h5>
                  <p className="mb-2 font-bold text-2xl text-gray-400">
                    $ {item.price}
                  </p>
                  <p className="mb-2 font-normal text-xl text-white ">
                    SubTotal: $ {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Minus
                    onClick={() => handleMinus(item)}
                    disabled={item.quantity == 1}
                  />
                  <span className="text-white text-2xl">{item.quantity}</span>
                  <Plus onClick={() => handlePlus(item)} />
                </div>
              </div>
              <div
                onClick={() => handleRemove(item.id)}
                className="bg-red-400 h-48 px-4  flex items-center justify-center cursor-pointer hover:bg-red-500 transition-all ease-in-out"
              >
                Remove
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-10 mb-8 flex items-center gap-10">
        <h2 className="text-2xl font-bold leading-5">
          Total: $ {total.toFixed(2)}
        </h2>
        <button
          onClick={() => {
            notify("Order Placed!", "success");
          }}
          className="flex items-center gap-4 text-2xl text-white bg-green-500 rounded font-bold py-4 px-8 outline-none hover:bg-green-600 transition-all ease-in-out"
        >
          Checkout <RightArrow />{" "}
        </button>
      </div>
    </div>
  );
};
