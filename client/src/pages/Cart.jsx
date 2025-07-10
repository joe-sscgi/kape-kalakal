import {
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Cart";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/dashboard/cart/");
    return data;
  } catch (error) {
    // return redirect("/admin");
    console.log(error);
  }
};

const Cart = () => {
  // const userData = useHomepageLayoutContext().userData;
  const cartData = useLoaderData().cart;
  //   console.log(cartData);

  function decQty(cartItem, label) {
    var qtyVal = document.getElementById(cartItem + label).value;
    var updatedQtyVal = parseInt(qtyVal) - 1;
    if (qtyVal != 1) {
      document.getElementById(cartItem + label).value = updatedQtyVal;
      updateCartItemQty(cartItem, updatedQtyVal);
    } else {
      toast.error("Item Quantity can not be 0, delete it instead");
    }
  }

  function incQty(cartItem, label) {
    var qtyVal = document.getElementById(cartItem + label).value;
    var updatedQtyVal = parseInt(qtyVal) + 1;
    document.getElementById(cartItem + label).value = updatedQtyVal;
    updateCartItemQty(cartItem, updatedQtyVal);
  }

  const updateCartItemQty = async (cartItemId, qtyVal) => {
    const cartItemQty = { prodQty: qtyVal };
    // console.log(cartItemQty);
    try {
      await customFetch.patch(`/dashboard/cart/${cartItemId}`, cartItemQty);

      toast.success("Product Quantity Updated");
      //   return redirect("/dashboard/cart/");
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

  const delToTmpCart = async (userId, cart) => {
    try {
      await customFetch.delete(`/dashboard/cart/${cart._id}`, cart);

      toast.success("Product Deleted to Cart");
      //   return redirect("/dashboard/cart/");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

  return (
    <Wrapper>
      <section id="cart" className="cart section cart-section">
        <div className="section-title">
          <h1>Cart</h1>
        </div>

        <div className="">
          <div className="cart-container">
            <div className="cart-header">
              <h3 className="header-qty">Quantity</h3>
              <h3>Image</h3>
              <h3>Product Name</h3>
              <h3 className="header-price">Price</h3>
              <h3 className="header-action">Action</h3>
            </div>
            {cartData.length === 0 ? (
              <p>Cart Empty.</p>
            ) : (
              cartData.map((cart) => {
                return (
                  <div className="cart-card" key={cart._id}>
                    <div className="cart-card-inner">
                      <div className="cart-info">
                        <div className="cart-qty">
                          <button
                            type="button"
                            onClick={decQty.bind(null, cart._id, "-cart-qty")}
                            className="btn cart-btn cart-qty-btn"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={cart.prodQty}
                            id={cart._id + "-cart-qty"}
                            className="form-control"
                          />

                          <button
                            type="button"
                            onClick={incQty.bind(null, cart._id, "-cart-qty")}
                            className="btn cart-btn cart-qty-btn"
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-prod-img">
                          <img src={cart.prodImgUrl} alt={cart.prodName} />
                        </div>
                        <div className="cart-name">
                          <span>{cart.prodName}</span>
                        </div>

                        <div className="cart-price">
                          <span>₱{Number(cart.prodPrice).toFixed(2)}</span>
                        </div>
                        <div className="cart-add-to-cart-btn">
                          <button
                            type="button"
                            className="btn cart-btn del-to-cart-btn"
                            onClick={delToTmpCart.bind(null, cart.userID, cart)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="cart-checkout">
            <button type="button" className="btn btn-checkout">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Cart;
