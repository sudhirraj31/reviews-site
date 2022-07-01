import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
import { FaCloudUploadAlt } from "react-icons/fa";

import { graphcms } from "../../API";
import styled from "styled-components";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleReset = () => {
    setTitle("");
    setBody("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    // uploading file
    const form = new FormData();
    form.append("fileUpload", file);
    fetch(`${process.env.REACT_APP_GRAPHCMS_ENDPOINT}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GRAPHCMS_TOKEN}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((json) => {
        // publish image
        const PUBLISH_ASSET = gql`
          mutation {
            publishAsset(where: { id: "${json.id}" }) {
              id
            }
          }
        `;
        graphcms.request(PUBLISH_ASSET);

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
              image: {
                connect: {
                  id: "${json.id}"
                }
              } 
            }){
              id
            }
          }
        `;
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
      });
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
          required
        />
      </FormControl>
      <FormControl>
        <Textarea
          type="text"
          name="body"
          placeholder="Write your review here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </FormControl>
      <StyledUploader>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          error="false"
          onChange={handleFileChange}
          style={{ display: "none" }}
          required
        />{" "}
        <span>
          <FaCloudUploadAlt size={24} />
        </span>{" "}
        {file ? file.name : <StyledUploadText>Browse Files</StyledUploadText>}
      </StyledUploader>
      {loading ? (
        <Button>Sending for review...</Button>
      ) : (
        <Button
          onClick={handleSubmit}
          shape={SHAPE.pill}
          disabled={
            title.length !== 0 && body.length !== 0 && file ? false : true
          }
        >
          Post
        </Button>
      )}
    </div>
  );
};

export default WriteReview;

const StyledUploader = styled.label`
  display: block;
  align-content: center;
  margin: 40px 0;
  padding: 50px 0px;
  border: 2px dashed #ccc;
  border-radius: 20px;
  background-color: #f6f6f6;
  cursor: pointer;
`;

const StyledUploadText = styled.span`
  margin: 5px 0px;
  padding: 10px 20px;
  font-weight: 600;
  background-color: #eeeeee;
  border-radius: 20px;
`;
