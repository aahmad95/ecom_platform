import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../admin/Sidebar";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/esm/Image";

const ProductDetailsOfSeller = (props) => {
  const param = useParams();

  const [load, setLoad] = useState(false);

  const [product, setProduct] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  // Add Product
  const [show, setShow] = useState(false);

  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [style, setStyle] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [processor, setProcessor] = useState("");
  const [camera, setCamera] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [battery, setBattery] = useState("");
  const [bluetooth, setBluetooth] = useState("");
  const [gameType, setGameType] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [shelfLife, setShelfLife] = useState("");

  const [modal, setModal] = useState(false);

  // Edit Product
  const [edit, setEdit] = useState(false);

  const [editId, setEditId] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editSize, setEditSize] = useState("");
  const [editColor, setEditColor] = useState("");
  const [editMaterial, setEditMaterial] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editStyle, setEditStyle] = useState("");
  const [editOperatingSystem, setEditOperatingSystem] = useState("");
  const [editProcessor, setEditProcessor] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editRam, setEditRam] = useState("");
  const [editStorage, setEditStorage] = useState("");
  const [editBattery, setEditBattery] = useState("");
  const [editBluetooth, setEditBluetooth] = useState("");
  const [editGameType, setEditGameType] = useState("");
  const [editAgeRange, setEditAgeRange] = useState("");
  const [editCapacity, setEditCapacity] = useState("");
  const [editType, setEditType] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editVolume, setEditVolume] = useState("");
  const [editShelfLife, setEditShelfLife] = useState("");

  const [doneEdit, setDoneEdit] = useState(false);

  // Delete ProductDetail:
  const [cancel, setCancel] = useState(false);
  const [del, setDel] = useState(false);
  const [productDetailId, setProductDetailId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "seller") {
        getProduct();
        getProductDetails();
      }
    }
    setLoad(false);
    // eslint-disable-next-line
  }, [load]);
  const getProduct = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/v1/product/getProduct/${param.productId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getProductDetails = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetailsByProduct/${param.productId}`,
      requestOptions
    );
    if (response.status === 200) {
      const json = await response.json();
      const soldProductCount = json.map(async (productDetail) => {
        productDetail["SoldProducts"] = await getSoldProductCount(
          productDetail.id
        );

        return productDetail;
      });
      await Promise.all(soldProductCount);
      setProductDetails(json);
    }
  };
  const getSoldProductCount = async (productDetailId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/orderItem/getOrderItemOfProductDetail/${productDetailId}`,
      requestOptions
    );

    if (response.status === 204) {
      return 0;
    } else if (response.status === 200) {
      const json = await response.json();
      return json.length;
    }
  };

  const handleDelete = async (productDetailId) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/deleteProductDetail/${productDetailId}`,
      requestOptions
    );

    if (response !== 500) {
      setDel(true);
      setLoad(true);
    }
  };
  const handleAdd = async (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      productId: param.productId,
      stock: stock,
      image: [image],
      size: size,
      color: color,
      material: material,
      style: style,
      operatingSystem: operatingSystem,
      processor: processor,
      camera: camera,
      ram: ram,
      storage: storage,
      battery: battery,
      bluetooth: bluetooth,
      gameType: gameType,
      ageRange: ageRange,
      capacity: capacity,
      type: type,
      weight: weight,
      volume: volume,
      shelfLife: shelfLife,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/productDetail/createProductDetail",
      requestOptions
    );

    if (response.status === 200) {
      setModal(true);
      setLoad(true);
    }
  };
  const handleEdit = async (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      stock: editStock,
      image: [editImage],
      size: editSize,
      color: editColor,
      material: editMaterial,
      style: editStyle,
      operatingSystem: editOperatingSystem,
      processor: editProcessor,
      camera: editCamera,
      ram: editRam,
      storage: editStorage,
      battery: editBattery,
      bluetooth: editBluetooth,
      gameType: editGameType,
      ageRange: editAgeRange,
      capacity: editCapacity,
      type: editType,
      weight: editWeight,
      volume: editVolume,
      shelfLife: editShelfLife,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/updateProductDetail/${editId}`,
      requestOptions
    );

    if (response.status === 200) {
      setDoneEdit(true);
      setLoad(true);
    }
  };
  return (
    <>
      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3 mb-5">
          <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>{product.name}</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div>

          <Container>
            <Row>
              <Col className="gx-3 mx-3">
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2 fs-4 text-muted">Description:</div>
                  <h2>{product.description}</h2>
                </Stack>
                <hr />
                <Stack direction="horizontal" gap={1}>
                  <div className="p-2 fs-5 text-muted">Warranty:</div>
                  <div className="p-2 fs-5 text-info">{product.warranty}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2 fs-5 text-muted"> Brand: </div>
                  <div className="p-2 fs-5 text-info">{product.brand}</div>
                </Stack>
                <hr />
                <Stack direction="horizontal" gap={5}>
                  <h2> Price: </h2>
                  <h2 className="text-danger"> {product.price} Rs</h2>
                </Stack>
                <hr />
                <div className="p-2 fs-2 fw-bold text-dark">
                  Product Options:
                </div>
                <div className="mx-4 mt-3">
                  {productDetails?.length ? (
                    productDetails.map((product, index) => {
                      return (
                        <Stack
                          direction="horizontal"
                          className="my-5 text-wrap"
                          gap={2}
                          key={index}
                        >
                          <Button variant="info" size="sm" disabled>
                            {index + 1}
                          </Button>
                          {Object.keys(product).map((key, index) => {
                            if (
                              ![
                                "createdAt",
                                "updatedAt",
                                "id",
                                "productId",
                              ].includes(key)
                            ) {
                              if (
                                key === "stock" ||
                                key === "SoldProducts" ||
                                product[key]
                              ) {
                                if (key === "image") {
                                  return (
                                    <img
                                      className="border border-dark shadow-lg mx-3"
                                      width="70px"
                                      height="60px"
                                      alt="Ad"
                                      src={product[key]}
                                    />
                                  );
                                } else {
                                  return (
                                    <>
                                      <Stack
                                        key={index}
                                        direction="horizontal"
                                        gap={1}
                                      >
                                        <div className="p-2 fs-5">{key}: </div>
                                        <div className="p-2 fs-5 text-success">
                                          {product[key]}
                                        </div>
                                      </Stack>
                                    </>
                                  );
                                }
                              }
                            }
                            return false;
                          })}

                          <Button
                            variant="info fw-bold shadow-lg mb-2 mx-2"
                            onClick={() => {
                              setEditId(product.id);
                              setEditStock(product.stock);
                              setEditSize(product.size);
                              setEditColor(product.color);
                              setEditMaterial(product.material);
                              setEditImage(product.image);
                              setEditStyle(product.style);
                              setEditOperatingSystem(product.operatingSystem);
                              setEditProcessor(product.processor);
                              setEditCamera(product.camera);
                              setEditRam(product.ram);
                              setEditStorage(product.storage);
                              setEditBattery(product.battery);
                              setEditBluetooth(product.blutooth);
                              setEditGameType(product.gameType);
                              setEditAgeRange(product.ageRange);
                              setEditCapacity(product.capacity);
                              setEditType(product.type);
                              setEditWeight(product.weight);
                              setEditVolume(product.volume);
                              setEditShelfLife(product.shelfLife);

                              setEdit(true);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square fa-beat-fade"></i>
                          </Button>
                          <Button
                            variant="danger fw-bold shadow-lg mb-2 mx-2"
                            onClick={() => {
                              setProductDetailId(product.id);
                              setCancel(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can fa-beat-fade"></i>
                          </Button>
                        </Stack>
                      );
                    })
                  ) : (
                    <div className="text-center fs-3 text-danger">
                      You haven't added any ProductDetails of this product yet.
                    </div>
                  )}
                </div>
                <div className="text-center my-5">
                  <Button
                    variant="outline-success shadow-lg fs-4 fw-bold p-2 px-3"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    Add Product Details
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Stack>
      <div>
        <Sidebar />
      </div>

      <div>
        {/* Handle Delete  */}
        <Modal
          show={cancel}
          onHide={() => {
            setCancel(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="fw-bold text-center fs-2"
            >
              Delete Product Option
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-2 text-danger">
            This Product Option will be deleted. Are you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger shadow-lg fw-bold px-4"
              onClick={() => {
                handleDelete(productDetailId);
                setCancel(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="info shadow-lg fw-bold px-4"
              onClick={() => {
                setCancel(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Successfully deleted the ProductDetail. */}
        <Modal
          show={del}
          onHide={() => {
            setDel(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="fw-bold text-center fs-3"
            >
              Successfully Deleted the Product Option
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i className="fa-solid fa-circle-check fa-bounce"></i> 1 Product
              Option has been deleted successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setDel(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>

        {/* Add new Product Detail*/}
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleAdd}>
            <Modal.Header className="mx-2" closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
                Add new Product Option
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-2">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Stock:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) =>
                    e.target.value >= 0
                      ? setStock(e.target.value)
                      : (e.target.value = "")
                  }
                  type="number"
                  min="0"
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fs-4">Product Image:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  type="file"
                  size="md"
                  required
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;
                        // You can use imageDataURL as a base64-encoded image string.
                        setImage(imageDataURL);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Size:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setSize(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Color:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Material:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setMaterial(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Style:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setStyle(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">
                  Product Operating System:
                </Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setOperatingSystem(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Processor:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setProcessor(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Camera:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setCamera(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Ram:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setRam(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Storage:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setStorage(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Battery:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setBattery(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Bluetooth:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setBluetooth(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Game Type:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setGameType(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Age Range:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setAgeRange(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Capacity:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setCapacity(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Type:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setType(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Weight:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setWeight(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Volume:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setVolume(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product ShelfLife:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  onChange={(e) => setShelfLife(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="mx-3">
              <Button
                variant="secondary shadow-lg fw-bold p-2 px-4"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="success shadow-lg fw-bold p-2" type="submit">
                Add new Product
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        {/* Successfully Added the Product */}
        <Modal
          show={modal}
          onHide={() => {
            setModal(false);
            setShow(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="fw-bold text-center fs-3"
            >
              Successfully Added the Product Option
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i className="fa-solid fa-circle-check fa-bounce"></i> 1 new
              Product Option has been added successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setModal(false);
                setShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
        {/* Edit Product Detail */}
        <Modal
          show={edit}
          onHide={() => {
            setEdit(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleEdit}>
            <Modal.Header className="mx-2" closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
                Edit Product Option
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-2">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Stock:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editStock}
                  onChange={(e) =>
                    e.target.value >= 0
                      ? setEditStock(e.target.value)
                      : (e.target.value = "")
                  }
                  type="number"
                  min="0"
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fs-4">Product Image:</Form.Label>
                <div className="text-center">
                  <Image
                    className="shadow-lg mb-2 border"
                    height="160px"
                    width="320px"
                    src={editImage}
                    rounded
                  />
                </div>
                <Form.Control
                  className="shadow-lg"
                  type="file"
                  size="md"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;
                        // You can use imageDataURL as a base64-encoded image string.
                        setEditImage(imageDataURL);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Size:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editSize}
                  onChange={(e) => setEditSize(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Color:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Material:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editMaterial}
                  onChange={(e) => setEditMaterial(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Style:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editStyle}
                  onChange={(e) => setEditStyle(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">
                  Product Operating System:
                </Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editOperatingSystem}
                  onChange={(e) => setEditOperatingSystem(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Processor:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editProcessor}
                  onChange={(e) => setEditProcessor(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Camera:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editCamera}
                  onChange={(e) => setEditCamera(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Ram:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editRam}
                  onChange={(e) => setEditRam(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Storage:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editStorage}
                  onChange={(e) => setEditStorage(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Battery:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editBattery}
                  onChange={(e) => setEditBattery(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Bluetooth:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editBluetooth}
                  onChange={(e) => setEditBluetooth(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Game Type:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editGameType}
                  onChange={(e) => setEditGameType(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Age Range:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editAgeRange}
                  onChange={(e) => setEditAgeRange(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Capacity:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Type:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Weight:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editWeight}
                  onChange={(e) => setEditWeight(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Volume:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editVolume}
                  onChange={(e) => setEditVolume(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product ShelfLife:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editShelfLife}
                  onChange={(e) => setEditShelfLife(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="mx-3">
              <Button
                variant="secondary shadow-lg fw-bold p-2 px-4"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="success shadow-lg fw-bold p-2" type="submit">
                Update Product Options
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        {/* Successfully edited the Product Details. */}
        <Modal
          show={doneEdit}
          onHide={() => {
            setDoneEdit(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="fw-bold text-center fs-3"
            >
              Successfully Edited the Product Options
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i className="fa-solid fa-circle-check fa-bounce"></i> 1 Product
              Options has been updated successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setDoneEdit(false);
                setEdit(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ProductDetailsOfSeller;
