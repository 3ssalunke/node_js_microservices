import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSelector } from "react-redux";

import TextInput from "#root/components/shared/TextInput";
import TextArea from "#root/components/shared/TextArea";

const Button = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  background-color: ${(props) => props.theme.whiteSmoke};
  margin-top: 1rem;
  padding: 1rem;
`;

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const mutation = gql`
  mutation($description: String!, $title: String!) {
    createListing(description: $description, title: $title) {
      id
    }
  }
`;

const AddListing = ({ onAddListing: pushAddListing }) => {
  const [createListing] = useMutation(mutation);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const session = useSelector((state) => state.session);

  if (!session) return "Login to add listing.";

  const onSubmit = handleSubmit(async ({ description, title }) => {
    await createListing({ variables: { description, title } });
    reset();
    pushAddListing();
  });

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        <LabelText>Title</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="title"
          type="text"
          ref={register}
        />
      </Label>
      <Label>
        <LabelText>Description</LabelText>
        <TextArea
          disabled={isSubmitting}
          name="description"
          type="textarea    "
          ref={register}
        />
      </Label>
      <Button disabled={isSubmitting} type="submit">
        Add Listing
      </Button>
    </Form>
  );
};

export default AddListing;
