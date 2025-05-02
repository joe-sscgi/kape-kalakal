import Wrapper from "../../../assets/wrappers/MainUsers";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { redirect, Link } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const brandQuery = {
  queryKey: ["brandLists"],
  queryFn: async () => {
    const { data } = await customFetch.get("/admin/main-brands");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(brandQuery);
  } catch (error) {
    return redirect("/admin");
  }
};

const MainBrands = () => {
  const brands = useQuery(brandQuery).data.brandsData;

  return (
    <Wrapper>
      <section id="main-brand" className="main-brand section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Brands</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Link to={"/admin/add-brand"}>
                    <Button
                      type="button"
                      className="btn add-brand-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>ADD</span>
                    </Button>
                  </Link>
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/admin/edit-brand/${brand._id}`}>
                        <Button
                          type="button"
                          className="btn edit-brand-btn main-btn"
                          variant="primary"
                        >
                          <TbEditCircle /> <span>EDIT</span>
                        </Button>
                      </Link>
                      <Link to={`/admin/del-brand/${brand._id}`}>
                        <Button
                          type="button"
                          className="btn del-brand-btn main-btn"
                          variant="danger"
                        >
                          <MdRemoveCircleOutline /> <span>DELETE</span>
                        </Button>
                      </Link>
                    </td>
                    <td>{brand.brandName}</td>
                    <td>{brand.brandDesc}</td>
                    <td>{brand.brandCat}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </Wrapper>
  );
};
export default MainBrands;
