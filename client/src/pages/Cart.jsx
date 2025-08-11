import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSm(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const decQty = async (cartItem, label) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const qtyInput = document.getElementById(cartItem + label);
      const qtyVal = parseInt(qtyInput.value);
      const updatedQtyVal = qtyVal - 1;

      if (updatedQtyVal < 1) {
        toast.error("Item Quantity cannot be 0, delete instead");
        return;
      }

      qtyInput.value = updatedQtyVal;
      await updateCartItemQty(cartItem, updatedQtyVal);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const incQty = async (cartItem, label) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const qtyInput = document.getElementById(cartItem + label);
      const qtyVal = parseInt(qtyInput.value);
      const updatedQtyVal = qtyVal + 1;

      qtyInput.value = updatedQtyVal;
      await updateCartItemQty(cartItem, updatedQtyVal);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateCartItemQty = async (cartItemId, qtyVal) => {
    const cartItemQty = { prodQty: qtyVal };

    try {
      await customFetch.patch(`/dashboard/cart/${cartItemId}`, cartItemQty);
      toast.success("Product Quantity Updated");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error updating item");
    }
  };

  const delToTmpCart = async (userId, cart) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await customFetch.delete(`/dashboard/cart/${cart._id}`);
      toast.success("Product Deleted from Cart");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setIsLoading(false);
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
                          disabled={cart.prodQty === 1 || isLoading}
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
                          disabled={isLoading}
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
                              disabled={isLoading}
                              onClick={delToTmpCart.bind(
                                null,
                                cart.userID,
                                cart
                              )}
                            >
                              <MdDeleteForever />
                              {/* <MdRemoveCircleOutline /> */}
                              {/* <span>DELETE</span> */}
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
                            <div
                              className="cart-prod-info-mobile"
                              disabled={isLoading}
                            >
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
              <div>
                <Link to={"/dashboard/shop"}>
                  <span>
                    <FiArrowLeftCircle /> Continue Shopping
                  </span>
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-checkout"
                disabled={isLoading || cartData.length === 0}
                onClick={() => {
                  if (!isLoading) {
                    window.location.href = "/dashboard/cart/checkout";
                  }
                }}
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Cart;
