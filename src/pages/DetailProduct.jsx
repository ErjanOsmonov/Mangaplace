import React from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";
import { Container, Grid } from "@mui/material";
import BlackStar from "../images/star.png";
import YellowStar from "../images/star (1).png";
import Folder from "../images/folder.png";
import ProductInformtion from "../components/ProductInformtion";
import ProductComments from "../components/ProductComments";
import RateModal from "../components/RateModal";

const DetailProduct = () => {
  const params = useParams();
  const {
    getProductDetail,
    productDetail,
    checkProductInFavorite,
    addAndDeleteProductInFavorite,
    rate
  } = React.useContext(ClientContext);

  const [show, setShow] = React.useState("info");

  const [modal, setModal] = React.useState(null);
  // This
  React.useEffect(() => {
    getProductDetail(params.id);
  }, []);
  if (!productDetail) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="product-page-body">
      {modal && <RateModal setModal={setModal} productId={productDetail.id} />}
      <Container>
        <div className="product-detail">
          <Grid item xs={12} sm={4} md={3}>
            <div className="product-image">
              <img src={productDetail.image} alt="manga-image" />
            </div>
            {checkProductInFavorite(productDetail.id) ? (
              <div
                className="product-category-box"
                onClick={() => addAndDeleteProductInFavorite(productDetail)}
                style={{ backgroundColor: "rgb(67, 172, 58)" }}
              >
                <div className="product-box-image">
                  <img src={Folder} alt="" />
                </div>
                <p>Читаю</p>
              </div>
            ) : (
              <div
                className="product-category-box"
                onClick={() => addAndDeleteProductInFavorite(productDetail)}
              >
                <div className="product-box-image">
                  <img src={Folder} alt="" />
                </div>
                <p>Добаввить</p>
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <div className="product-info">
              <div className="product-header">
                <span className="product-title">
                  <p>{productDetail.name}</p>
                </span>
                {rate && (
                  <div
                    className="product-average"
                    onClick={() => setModal(true)}
                  >
                    <div className="product-rate">
                      <img width="20px" src={YellowStar} alt="" />
                      <p>{rate[0].rateAvg}</p>
                      <p className="product-rate-amount">
                        {`/ ${rate[0].rateAmount}`}
                      </p>
                    </div>
                    <div className="product-rate-bar">
                      <img width="20px" src={BlackStar} alt="" />
                      <p>Оценить</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="product-main">
                <div className="product-subUnit">
                  <button onClick={() => setShow("info")}>Information</button>
                  <button onClick={() => setShow("chapters")}>Chapters</button>
                  <button onClick={() => setShow("comments")}>Comments</button>
                </div>
                {show === "info" ? (
                  <ProductInformtion productDetail={productDetail} />
                ) : (
                  <div></div>
                )}
                {show === "comments" ? (
                  <ProductComments productDetail={productDetail} />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default DetailProduct;
