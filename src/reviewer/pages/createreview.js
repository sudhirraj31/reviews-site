import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";

import { graphcms } from "../../API";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    setTitle("");
    setBody("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    // posting new review to the graphcms
    const POST_REVIEW = gql`
      mutation {
        createReview(data: { 
          title: "${title}", 
          body: "${body}", 
          view: 0, 
          like: 0,
          approve: false, 
          author: {
            connect: {
              id: "${localStorage.getItem("token")}"
            }
          } 
        }){
          id
        }
      }
    `;
    setTimeout(() => {
      graphcms
        .request(POST_REVIEW)
        .then((review) => {
          graphcms.request(`
            mutation {
              publishReview(where: { id: "${review.createReview.id}" }) {
                id
              }
            }
          `);
        })
        .then(() => {
          setLoading(false);
          handleReset();
          navigate("/");
        })
        .catch((err) => console.log(err));
    }, 1000);
  };
  return (
    <div style={{ margin: "50px auto", width: "70%", textAlign: "center" }}>
      <FormControl>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Textarea
          type="text"
          name="body"
          placeholder="Write your review here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </FormControl>
      {loading ? (
        <Button>Sending for review...</Button>
      ) : (
        <Button onClick={handleSubmit} shape={SHAPE.pill}>
          Post
        </Button>
      )}
    </div>
  );
};

export default WriteReview;
