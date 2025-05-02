import Wrapper from "../../../assets/wrappers/MainUsers";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";

import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, Form } from "react-router-dom";
import { FormRow, SubmitBtn } from "../../../components";

const MainUsers = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  return (
    <Wrapper>
      <section id="main-user" className="main-user section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Users</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Button
                    type="button"
                    className="btn add-user-btn main-btn"
                    variant="success"
                    onClick={handleShowAdd}
                  >
                    <FiPlusCircle /> <span>ADD</span>
                  </Button>
                </th>
                <th>Username</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button
                    type="button"
                    className="btn add-user-btn main-btn"
                    variant="primary"
                    onClick={handleShowEdit}
                  >
                    <TbEditCircle /> <span>EDIT</span>
                  </Button>
                  <Button
                    type="button"
                    className="btn add-user-btn main-btn"
                    variant="danger"
                    onClick={handleShowDel}
                  >
                    <MdRemoveCircleOutline /> <span>DELETE</span>
                  </Button>
                </td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>add/edit/delete</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>add/edit/delete</td>
                <td>Larry</td>
                <td>the Bird</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>

      {/* ADD */}
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
        className="modal-add"
        id="modal-add"
      >
        <Modal.Header closebutton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" className="form-add-user">
            <div className="form-add-user-container">
              <FormRow
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="email@sample.com"
              />
              <FormRow
                type="username"
                id="username"
                name="username"
                className="form-input"
                placeholder="username"
              />
              <FormRow
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="password"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      {/* END ADD */}

      {/* EDIT */}
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closebutton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" className="form-edit-user">
            <div className="form-edit-user-container">
              <FormRow
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="email@sample.com"
              />
              <FormRow
                type="username"
                id="username"
                name="username"
                className="form-input"
                placeholder="username"
              />
              <FormRow
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="password"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      {/* END EDIT */}

      {/* DELETE */}
      <Modal
        show={showDel}
        onHide={handleCloseDel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closebutton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" className="form-edit-user">
            <div className="form-edit-user-container">
              <FormRow
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="email@sample.com"
              />
              <FormRow
                type="username"
                id="username"
                name="username"
                className="form-input"
                placeholder="username"
              />
              <FormRow
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="password"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDel}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      {/* END DELETE */}
    </Wrapper>
  );
};
export default MainUsers;
