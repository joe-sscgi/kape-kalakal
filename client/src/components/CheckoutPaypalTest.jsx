import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPaypalTest({ totalAmount, shippingDetails }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATJcJUNERQvdsHYK1-oNGHXyn_QdJAq0G4O0qK5P0SUmacj4N_3qE5Jp7FM2F2O-2L5j-rLhZ12Yan8M",
        currency: "PHP",
        disableFunding: "card",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount.toFixed(2), // format to 2 decimal places
                },
                shipping: {
                  name: {
                    full_name: shippingDetails.fullName,
                  },
                  address: {
                    address_line_1: shippingDetails.addressLine1,
                    address_line_2: shippingDetails.addressLine2,
                    admin_area_2: shippingDetails.city, // city / municipality
                    admin_area_1: shippingDetails.province, // province / region
                    postal_code: shippingDetails.postalCode || "0000", // ✅ REQUIRED
                    country_code: "PH",
                  },
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          console.log(details);
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        }}
      />
    </PayPalScriptProvider>
  );
}
