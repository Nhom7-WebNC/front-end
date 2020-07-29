import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  ButtonToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
  Spinner,
} from "reactstrap";
import { connector } from "../../constants";
import Moment from "moment";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ListReceiver = (props) => {
  const [todos, setDataTable] = useState();
  const [error, setError] = useState("");

  const [reminderNumber, setReminderNumber] = useState();
  const [reminderName, setReminderName] = useState();
  //define for modal
  const [visible, setVisible] = useState(false);

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };
  const [ModalTitle, setModalTitle] = useState();
  const toggle = (todo) => {
    setModal(!modal);
    setReminderNumber(todo.reminder_account_number);
    setReminderName(todo.name_reminiscent);

    setModalTitle(todo.name_reminiscent);
  };
  const [loading, setLoading] = useState(false);
  const updateReceiver = () => {
    setLoading(true);
  };
  const deleteReceiver = () => {
    setLoading(true);
  };
  const getReminderName = async (props) => {
    Moment.locale("vn");

    const user_id = localStorage.getItem("userId");
    const response = connector
      .post("/customers/getReceiverList", {
        user_id: user_id,
        bank_code: "PPNBank",
      })
      .then(
        (response) => {
          console.log("response3", response.rows);
          setDataTable(response.rows);
          // setVisible(false);

          //
        },
        (error) => {
          console.log("err123", error.response);
          // setError(error.response.data.msg);
          // setVisible(true);
        }
      );
  };
  useEffect(() => {
    getReminderName();
  }, []);

  return (
    <div className="animated fadeIn">
      {/* modal */}
      <Modal
        isOpen={loading}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
        style={{ backgroundColor: "gray", width: "15rem", height: "5rem" }}
      >
        <Button
          color="primary"
          disabled
          style={{ width: "15rem", height: "5rem" }}
        >
          <Spinner animation="grow" variant="info" />
          Loading...
        </Button>
      </Modal>

      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>{ModalTitle}</ModalHeader>
        <ModalBody>
          <Form
          // onSubmit={handleSubmit(onSubmit)}
          // action=""
          // method="post"
          // encType="multipart/form-data"
          // className="form-horizontal"
          >
            <Alert color="danger" isOpen={visible}>
              {error}
            </Alert>
            <CardHeader>
              <strong>Thông tin đăng nhập</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Tên gợi nhớ</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="text-input"
                    value={reminderName}
                    onChange={(e) => setReminderName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Số tài khoản</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="text-input"
                    value={reminderNumber}
                    onChange={(e) => setReminderNumber(e.target.value)}
                  />
                </Col>
              </FormGroup>
            </CardBody>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => updateReceiver()}>
            Lưu
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Quay về
          </Button>
        </ModalFooter>
      </Modal>

      {/* index */}
      <Card>
        <CardHeader>
          <strong>Danh sách người nhận</strong>
        </CardHeader>

        <CardBody>
          <Row>
            <Col>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Số tài khoản</th>
                    <th>Tên gợi nhớ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {todos != null ? (
                    todos.map((todo) => (
                      <tr>
                        <td>{todo.reminder_account_number}</td>
                        <td>{todo.name_reminiscent}</td>
                        <td>
                          <Button
                            onClick={() => deleteReceiver(todo.id)}
                            color="danger"
                          >
                            XOÁ{" "}
                          </Button>
                          &ensp;
                          <ButtonToggle
                            color="primary"
                            onClick={() => toggle(todo)}
                          >
                            SỬA
                          </ButtonToggle>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem>
                  <PaginationLink previous tag="button">
                    Trước
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem className="page-item">
                  <PaginationLink tag="button">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next tag="button">
                    Sau
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ListReceiver;
