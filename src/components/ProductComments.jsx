import React from "react";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "../contexts/AuthProvider";
import { ClientContext } from "../contexts/ClientProvider";

const ProductComments = ({ productDetail }) => {
  const { user, checkUser } = React.useContext(AuthContext);
  const { addComment, getComments, comments } = React.useContext(ClientContext);
  const [comment, setComment] = React.useState({
    userName: "",
    comment: "",
  });

  React.useEffect(() => {
    checkUser();
    getComments(productDetail.id);
  }, []);

  const handleInput = (event) => {
    let object = {
      ...comment,
      [event.target.name]: event.target.value,
    };
    setComment(object);
  };

  const handleNameInput = (event) => {
    if (user) {
      event.target.value = user.displayName;
      let object = {
        ...comment,
        userName: event.target.value,
        userImg: user.photoURL,
        userUid: user.uid,
      };
      setComment(object);
    } else {
      handleInput(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in comment) {
      if (!comment[key].trim()) {
        alert("FIeld required!");
        return;
      }
    }
    addComment(comment, productDetail);
    setComment({
      userName: "",
      comment: "",
    });
  };

  return (
    <>
      <div className="product-commment-create">
        <TextField
          InputLabelProps={{
            style: {
              color: "rgb(117,117,117)",
            },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onMouseOver={handleNameInput}
          fullWidth
          className="displayNameText"
          name="userName"
          label="Name"
          sx={{ mt: 2, border: "1px solid rgb(59, 61, 69)" }}
          disabled={true}
          value={comment.userName}
        ></TextField>
        <TextField
          onChange={handleInput}
          fullWidth
          name="comment"
          label="Comment"
          sx={{ mt: 2, border: "1px solid rgb(59, 61, 69)" }}
          InputLabelProps={{
            style: {
              color: "rgb(117,117,117)",
            },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          value={comment.comment}
        ></TextField>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
      <div className="product-comments">
        {!comments ? (
          <h2>Loading...</h2>
        ) : (
          comments.map((item) => (
            <div key={Date.now} className="product-comment">
              <div className="comment-avatar">
                <img width="35px" src={item.userImg} alt="user" />
                <p>{item.userName}</p>
              </div>
              <div className="comment-content">
                <p>{item.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductComments;
