import { Form, Link, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Checkout";
import { useEffect, useState } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/dashboard/cart/checkout");
    return data;
  } catch (error) {
    // return redirect("/admin");
    console.log(error);
  }
};

const Checkout = () => {
  const data = useLoaderData().checkoutDetails;

  const { userInfo, userCart } = data;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  var prodSubTotal = 0;
  var total = 0;
  var totalItems = 0;
  var discountPrice = 0;
  var shippingPrice = 60;

  return (
    <Wrapper>
      <section id="cart" className="cart section checkout-section">
        <div className="section-title">
          <h1>Checkout</h1>
        </div>

        <div className="container">
          <div className="checkout-container">
            <div className="checkout-user-details">
              <div className="checkout-header">
                <h3>Shipping Details</h3>
              </div>
              <input
                type="checkbox"
                name="Default Address"
                id="defaultAddress"
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={
                  !userInfo?.userAddressNoStBrgy?.trim() ||
                  !userInfo?.userAddressCityMunicipality?.trim() ||
                  !userInfo?.userProvince?.trim()
                }
              />
              <label htmlFor="defaultAddress">Use Default Address</label>
              <br />
              {!userInfo?.userAddressNoStBrgy?.trim() ||
              !userInfo?.userAddressCityMunicipality?.trim() ||
              !userInfo?.userProvince?.trim() ? (
                <span>No saved address</span>
              ) : (
                <div>
                  <span>Your Default Address : </span>
                  <span className="default-address">
                    {userInfo?.userAddressNoStBrgy +
                      " " +
                      userInfo?.userAddressCityMunicipality +
                      " " +
                      userInfo?.userProvince}
                  </span>
                </div>
              )}
              {!isChecked && (
                <div className="other-address-details">
                  <Form method="post" className="other-address-details-form">
                    <div className="other-address-details-header">
                      <h3>Provide a Shipping Address</h3>
                    </div>

                    <div className="other-address-details">
                      <div className="">
                        <input
                          type="text"
                          name="userAddressNoStBrgy"
                          className="userAddressNoStBrgy form-control checkout-form-control"
                          placeholder="House/Blk/Lot/Unit No. Street/Barangay"
                          required={isChecked}
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          name="userAddressCityMunicipality"
                          className="userAddressCityMunicipality form-control checkout-form-control"
                          placeholder="City/Municipality"
                          required={isChecked}
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          name="userProvince"
                          className="userProvince form-control checkout-form-control"
                          placeholder="Province"
                          required={isChecked}
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          name="userLandmark"
                          className="userLandmark form-control checkout-form-control"
                          placeholder="Landmark(Optional)"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </div>
            <div className="checkout-user-order-summary">
              <div className="checkout-header">
                <h3>Oder Summary</h3>
              </div>
              <div className="checkout-order-summary-container">
                <div className="checkout-order-summary">
                  {userCart.length === 0 ? (
                    <p>Cart Empty.</p>
                  ) : (
                    userCart.map((cart) => {
                      var prodTotal = cart.prodPrice * cart.prodQty;
                      prodSubTotal += prodTotal;
                      totalItems += cart.prodQty;
                      return (
                        <div className="checkout-card" key={cart._id}>
                          <div className="checkout-card-inner">
                            <div className="checkout-info">
                              <div className="checkout-prod">
                                <div className="checkout-prod-img">
                                  <img
                                    src={cart.prodImgUrl}
                                    alt={cart.prodName}
                                  />
                                </div>
                                <div className="checkout-name">
                                  <span>
                                    {cart.prodName} x {cart.prodQty}
                                  </span>
                                </div>
                              </div>

                              <div className="checkout-total">
                                <span>
                                  ₱
                                  {Number(prodTotal).toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="checkout-order-total">
                  <div className="checkout-total">
                    <div className="checkout-item-total">
                      <h5>Total Items :</h5>
                      <span>{totalItems}</span>
                    </div>
                    <div className="checkout-subtotal">
                      <h5>Subtotal : </h5>
                      <span>
                        ₱
                        {Number(prodSubTotal).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="checkout-shipping">
                      <h5>Shipping Fee : </h5>
                      <span>
                        ₱
                        {Number(shippingPrice).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <div className="checkout-discount">
                      <h5>Discount : </h5>
                      <span>
                        ₱
                        {Number(discountPrice).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="checkout-grandtotal">
                      <h2>Total : </h2>
                      <span>
                        ₱
                        {Number(
                          prodSubTotal + shippingPrice - discountPrice
                        ).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="checkout-checkout">
                    <Link to={"/dashboard/cart/checkout"}>
                      <button type="button" className="btn btn-checkout">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Checkout;
