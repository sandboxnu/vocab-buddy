import React from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout";
import { singleRequest } from "./data/actions";

// An example of using a connector
const connector = connect((state) => state, {
  request: singleRequest.request,
  addUser: singleRequest.addUser,
});

const Page = ({ id, request, addUser }) => {
  return (
    <Layout>
      <div onClick={request}>Welcome to vocab buddy</div>
      <div onClick={() => addUser({ name: "Jack" })}>Add name Jack</div>
    </Layout>
  );
};

export default connector(Page);
