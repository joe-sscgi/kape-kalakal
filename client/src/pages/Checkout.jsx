import { Form, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Checkout";
import { useState } from "react";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/dashboard/cart/checkout");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const shippingDetails = {
      userAddressNoStBrgy: formData.get("userAddressNoStBrgy"),
      userAddressCityMunicipality: formData.get("userAddressCityMunicipality"),
      userProvince: formData.get("userProvince"),
      userLandmark: formData.get("userLandmark"),
      userPostalCode: formData.get("userPostalCode"),
      userInfo: JSON.parse(formData.get("userInfo")),
      userCart: JSON.parse(formData.get("userCart")),
      defaultAddress: formData.get("defaultAddress") === "on",
    };

    const { data } = await customFetch.post(
      "/dashboard/cart/checkout/place-order",
      { shippingDetails }
    );

    toast.success("Order placed successfully!");

    return redirect(
      `/dashboard/cart/checkout/payment-dashboard/${data.order._id}`
    );
  } catch (error) {
    console.log(error);
  }
};

const Checkout = () => {
  const data = useLoaderData().checkoutDetails;
  const { userInfo, userCart } = data;
  // console.log(userInfo, userCart);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  let totalPrice = 0;
  let prodSubTotal = 0;
  let totalItems = 0;
  let discountPrice = 0;
  let shippingPrice = 60;

  return (
    <Wrapper>
      <section id="cart" className="cart section checkout-section">
        <div className="section-title">
          <h1>Checkout</h1>
        </div>

        <div className="container">
          <Form
            method="post"
            className="checkout-container"
            onSubmit={() => setIsLoading(true)}
          >
            {/* Shipping Details */}
            <div className="checkout-user-details">
              <div className="checkout-header">
                <h3>Shipping Details</h3>
              </div>
              <input
                type="checkbox"
                id="defaultAddress"
                name="defaultAddress"
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

              {/* If default address selected → send hidden fields */}
              {isChecked && (
                <>
                  <input
                    type="hidden"
                    name="userAddressNoStBrgy"
                    value={userInfo?.userAddressNoStBrgy}
                  />
                  <input
                    type="hidden"
                    name="userAddressCityMunicipality"
                    value={userInfo?.userAddressCityMunicipality}
                  />
                  <input
                    type="hidden"
                    name="userProvince"
                    value={userInfo?.userProvince}
                  />
                  <input
                    type="hidden"
                    name="userLandmark"
                    value={userInfo?.userLandmark || ""}
                  />
                </>
              )}

              {/* If custom address → show inputs */}
              {!isChecked && (
                <div className="other-address-details">
                  <div className="other-address-details-header">
                    <h3>Provide a Shipping Address</h3>
                  </div>
                  <div className="other-address-details">
                    <input
                      type="text"
                      name="userAddressNoStBrgy"
                      className="form-control checkout-form-control"
                      placeholder="House/Blk/Lot/Unit No. Street/Barangay"
                      required={!isChecked}
                    />
                    <input
                      type="text"
                      name="userAddressCityMunicipality"
                      className="form-control checkout-form-control"
                      placeholder="City/Municipality"
                      required={!isChecked}
                    />
                    <input
                      type="text"
                      name="userProvince"
                      className="form-control checkout-form-control"
                      placeholder="Province"
                      required={!isChecked}
                    />
                    <input
                      type="text"
                      name="userPostalCode"
                      className="form-control checkout-form-control"
                      placeholder="Postal Code(Optional)"
                    />
                    <input
                      type="text"
                      name="userLandmark"
                      className="form-control checkout-form-control"
                      placeholder="Landmark(Optional)"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Order Summary */}
            <div className="checkout-user-order-summary">
              <div className="checkout-header">
                <h3>Order Summary</h3>
              </div>
              <div className="checkout-order-summary-container">
                <div className="checkout-order-summary">
                  {userCart.length === 0 ? (
                    <p>Cart Empty.</p>
                  ) : (
                    userCart.map((cart) => {
                      let prodTotal = cart.prodPrice * cart.prodQty;
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
                  {/* Set total price after mapping */}
                  {(() => {
                    totalPrice = prodSubTotal + shippingPrice - discountPrice;
                    return null; // Nothing to render here
                  })()}
                </div>

                {/* Hidden user infor and cart data for submission */}
                <input
                  type="hidden"
                  name="userCart"
                  value={JSON.stringify(userCart)}
                />
                <input
                  type="hidden"
                  name="userInfo"
                  value={JSON.stringify(userInfo)}
                />

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
                        {Number(totalPrice).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="checkout-checkout">
                    <button
                      type="submit"
                      className="btn btn-checkout"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </Wrapper>
  );
};

export default Checkout;
