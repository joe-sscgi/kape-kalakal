import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import Wrapper from "../assets/wrappers/AdminDashboard";
import customFetch from "../utils/customFetch";
import { useAdminDashboardLayoutContext } from "./AdminDashboardLayout";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/admin/get-data");
    return data.allData;
  } catch (error) {
    console.error(error);
    return {
      critProd: [],
      lowStock: [],
      pendingOrders: [],
      totalSales: 0,
      products: [],
      users: [],
      unreadMessages: [],
    };
  }
};

const ITEMS_PER_PAGE = 5;

const AdminDashboard = () => {
  const { user } = useAdminDashboardLayoutContext();
  const {
    critProd,
    lowStock,
    pendingOrders,
    totalSales,
    products,
    users,
    unreadMessages,
  } = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCritProd = useMemo(() => {
    return critProd.filter((prod) =>
      prod.prodName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [critProd, searchTerm]);

  const totalPages = Math.ceil(filteredCritProd.length / ITEMS_PER_PAGE);

  const paginatedCritProd = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCritProd.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCritProd, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when search changes
  };

  return (
    <Wrapper>
      <div className="admin-dashboard-container">
        <div className="container">
          <h1>Hello {user.userUsername}</h1>

          <section
            id="critical-items-section"
            className="critical-items-section"
          >
            <div className="overview-grid">
              {/* Group 1: Total Users */}
              <div className="overview-group">
                <div className="overview-card">
                  <h3>👥 Total Users / Customers</h3>
                  <p>{users?.length}</p>
                </div>
              </div>

              {/* Group 2: Products, Stocks, Orders, Sales */}
              <div className="overview-group">
                <div className="overview-card">
                  <h3>🛒 Total Products</h3>
                  <p>{products?.length}</p>
                </div>
                <div className="overview-card">
                  <h3>📦 Low Stock Items</h3>
                  <p>{lowStock?.length}</p>
                </div>
                <div className="overview-card">
                  <h3>⚠️ Pending Orders</h3>
                  <p>{pendingOrders?.length}</p>
                </div>
                <div className="overview-card">
                  <h3>📈 Total Sales</h3>
                  <p>₱ {totalSales.toLocaleString()}</p>
                </div>
              </div>

              {/* Group 4: Inquiries */}
              <div className="overview-group">
                <div className="overview-card">
                  <h3>💬 Unread Inquiries / Support Tickets</h3>
                  <p>{unreadMessages?.length}</p>
                </div>
              </div>
            </div>

            {/* Critical Items Section with Search + Pagination */}
            <div className="cis-container">
              <h2>The following Items are in Critical Zone</h2>
              <span className="sub-header">
                Critical Products less than or equal to 10
              </span>
              <br />
              <input
                type="text"
                placeholder="Search product name..."
                value={searchTerm}
                onChange={handleSearch}
                className="cis-search"
              />

              {filteredCritProd.length === 0 ? (
                <p>No Critical Products Found.</p>
              ) : (
                <>
                  {paginatedCritProd.map((prod) => (
                    <div className="cis-prod-card" key={prod._id}>
                      <div className="cis-prod-card-inner">
                        <div className="cis-prod-info">
                          <span>
                            Name:{" "}
                            <span className="prod-name">{prod.prodName}</span>
                          </span>
                          <br />
                          <span className="prod-info">
                            Category: {prod.prodCat} | Quantity: {prod.prodQty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pagination">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
