import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/Error";

const Error = () => {
  const error = useRouteError();
  return (
    <Wrapper>
      <section id="cart" className="cart section cart-section">
        <div className="section-title">
          <h1>Checkout</h1>
        </div>
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
      </section>
    </Wrapper>
  );
};
export default Error;
