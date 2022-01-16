import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { gql } from "@apollo/client";

import graphqlClient from "#root/api/graphqlClient";
import { setSession } from "#root/store/ducks/session";
import AccountDetails from "./AccountDetails";
import Listings from "./Listings";

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  width: 60rem;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const Sidebar = styled.div`
  flex: 0 auto;
  width: 10rem;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  width: 100%;
`;

const query = gql`
  {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

const Root = () => {
  const dispatch = useDispatch();
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    graphqlClient.query({ query }).then(({ data }) => {
      if (data.userSession) {
        dispatch(setSession(data.userSession));
      }
      setInitialize(true);
    });
  }, []);

  if (!initialize) return "Loading...";

  return (
    <Wrapper>
      <Container>
        <Content>
          <Listings />
        </Content>
        <Sidebar>
          <AccountDetails />
        </Sidebar>
      </Container>
    </Wrapper>
  );
};

export default Root;
