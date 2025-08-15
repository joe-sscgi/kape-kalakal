import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPaypalTest({ order }) {
  if (!order || !order.billingDetails) return <p>Loading...</p>;

  const {
    customerName,
    addressNoStBrgy,
    addressLandmark,
    addressCityMunicipality,
    addressProvince,
    postalCode,
  } = order.billingDetails;

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
                  value: order.totalAmount.toFixed(2),
                },
                shipping: {
                  name: {
                    full_name: customerName || "No Name",
                  },
                  address: {
                    address_line_1: order.billingDetails.addressNoStBrgy,
                    address_line_2: order.billingDetails.addressLandmark || "",
                    admin_area_2: order.billingDetails.addressCityMunicipality,
                    admin_area_1: order.billingDetails.addressProvince,
                    postal_code: order.billingDetails.postalCode || "00000",
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
