import { useLoaderData } from "react-router";
import Wrapper from "../assets/wrappers/AdminDashboard";
import customFetch from "../utils/customFetch";

import { useAdminDashboardLayoutContext } from "./AdminDashboardLayout";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/admin/get-data");
    return data.allData;
  } catch (error) {
    console.error(error);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
};

const AdminDashboard = () => {
  const { user } = useAdminDashboardLayoutContext();
  const critProducts = useLoaderData().critProd;
  return (
    <Wrapper>
      <div className="admin-dashboard-container">
        <div className="container">
          <h1>Hello {user.userUsername}</h1>

          <section
            id="critical-items-section"
            className="critical-items-section"
          >
            <div className="container">
              <div className="cis-container">
                <h2>The following Items are in Critical Zone</h2>
                <span className="sub-header">
                  Critical Products less than or equal to 10
                </span>
                {critProducts.length === 0 ? (
                  <p>No Critical Products Found.</p>
                ) : (
                  critProducts.map((prod) => {
                    return (
                      <div className="cis-prod-card" key={prod._id}>
                        <div className="cis-prod-card-inner">
                          <div className="cis-prod-info">
                            <span>
                              Name :{" "}
                              <span className="prod-name">{prod.prodName}</span>
                            </span>
                            <br />
                            <span className="prod-info">
                              Category : {prod.prodCat} | Quantity :{" "}
                              {prod.prodQty}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
