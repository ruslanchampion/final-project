import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";

const SpinnerGif = styled.img`
  width: 5em;
  height: 5em;
  margin: 0 auto;
  user-drag: none;
  margin-top: 5px;
`;

export const Spinner = () => {
  return <SpinnerGif src={spinner} alt="Spinner" />;
};
