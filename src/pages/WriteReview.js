import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
// import { FileUploader } from "baseui/file-uploader";

import { useAuth0 } from "@auth0/auth0-react";
import graphcms from "../API";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth0();
  console.log(user);

  const handleReset = () => {
    setTitle("");
    setBody("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    // posting new review to the graphcms
    const POST_REVIEW = gql`
      mutation {
        createReview(data: { title: "${title}", body: "${body}", view: 0, like: 0, author: {create: {email: "${user.email}", username: "${user.nickname}"}} }) {
          id
        }
      }
    `;

    setTimeout(() => {
      graphcms.request(POST_REVIEW).then(() => {
        setLoading(false);
        handleReset();
        navigate("/");
      });
    }, 1000);
  };
  return (
    <div style={{ textAlign: "center" }}>
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
      {/* <FileUploader /> */}
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
