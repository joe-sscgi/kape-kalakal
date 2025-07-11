import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveCircleOutline } from "react-icons/md";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Cart";
import { useEffect, useState } from "react";

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
  const cartData = useLoaderData().cart;

  var subTotal = 0;

  const [isMobileSm, setIsMobileSm] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSm(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        <div className="cart-outer-container">
          <div className="cart-container">
            <div className="cart-header">
              <h4 className="header-action"></h4>
              <h4 className="header-product">Products</h4>
              <h4 className="header-qty">Quantity</h4>
              <h4 className="header-price">Price</h4>
              <h4 className="header-total">Total</h4>
            </div>
            <hr />
            <div className="cart-items">
              {cartData.length === 0 ? (
                <p>Cart Empty.</p>
              ) : (
                cartData.map((cart) => {
                  var total = cart.prodPrice * cart.prodQty;
                  subTotal += total;

                  const CartInfoContent = () => (
                    <>
                      <div className="cart-qty">
                        <button
                          type="button"
                          onClick={decQty.bind(null, cart._id, "-cart-qty")}
                          className="btn cart-btn cart-qty-btn cart-inc-qty-btn"
                          disabled={cart.prodQty === 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={cart.prodQty}
                          id={cart._id + "-cart-qty"}
                          className="form-control"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={incQty.bind(null, cart._id, "-cart-qty")}
                          className="btn cart-btn cart-qty-btn cart-dec-qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-price">
                        <span>
                          ₱
                          {Number(cart.prodPrice).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="cart-total">
                        <span>
                          ₱
                          {Number(total).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </>
                  );

                  return (
                    <div className="cart-card" key={cart._id}>
                      <div className="cart-card-inner">
                        <div className="cart-info">
                          <div className="cart-del-to-cart-btn">
                            <button
                              type="button"
                              className="btn cart-btn del-to-cart-btn"
                              onClick={delToTmpCart.bind(
                                null,
                                cart.userID,
                                cart
                              )}
                            >
                              <MdRemoveCircleOutline /> <span>DELETE</span>
                            </button>
                          </div>
                          <div className="cart-prod">
                            <div className="cart-prod-img">
                              <img src={cart.prodImgUrl} alt={cart.prodName} />
                            </div>
                            <div className="cart-name">
                              <span>{cart.prodName}</span>
                            </div>
                          </div>
                          {isMobileSm ? (
                            <div className="cart-prod-info-mobile">
                              <CartInfoContent />
                            </div>
                          ) : (
                            <>
                              <CartInfoContent />
                            </>
                          )}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              )}
            </div>
            <div className="cart-sub-total">
              <h4>Subtotal : </h4>
              <span>
                ₱{" "}
                {Number(subTotal).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="cart-checkout">
              <Link to={"/dashboard/cart/checkout"}>
                <button type="button" className="btn btn-checkout">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Cart;
