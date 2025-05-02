import Wrapper from "../../../assets/wrappers/MainUsers";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { redirect, Link } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const prodQuery = {
  queryKey: ["prodLists"],
  queryFn: async () => {
    const { data } = await customFetch.get("/admin/main-products");
    return data.productsData;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(prodQuery);
  } catch (error) {
    return redirect("/admin");
  }
};

const MainProds = () => {
  const prods = useQuery(prodQuery).data;

  return (
    <Wrapper>
      <section id="main-prod" className="main-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Products</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Link to={"/admin/add-product"}>
                    <Button
                      type="button"
                      className="btn add-prod-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>ADD</span>
                    </Button>
                  </Link>
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Flavor of the Month</th>
                <th>Best Seller</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {prods.map((prod) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/admin/edit-product/${prod._id}`}>
                        <Button
                          type="button"
                          className="btn edit-prod-btn main-btn"
                          variant="primary"
                        >
                          <TbEditCircle /> <span>EDIT</span>
                        </Button>
                      </Link>
                      <Link to={`/admin/del-product/${prod._id}`}>
                        <Button
                          type="button"
                          className="btn del-prod-btn main-btn"
                          variant="danger"
                        >
                          <MdRemoveCircleOutline /> <span>DELETE</span>
                        </Button>
                      </Link>
                    </td>
                    <td>{prod.prodName}</td>
                    <td>{prod.prodDesc}</td>
                    <td>{prod.prodCat}</td>
                    <td>{prod.prodPrice}</td>
                    <td>
                      {prod.prodIsFotm ? (
                        <FaRegCheckCircle />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </td>
                    <td>
                      {prod.prodIsBest ? (
                        <FaRegCheckCircle />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </td>
                    <td>{prod.prodBrandID}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <p>Flavor of the Month</p>
          <p>Best Seller</p>
        </div>
      </section>
    </Wrapper>
  );
};
export default MainProds;
