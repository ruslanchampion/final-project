import styled from "styled-components";
import { Link } from "react-router-dom";

export const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

export const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -webkit-user-select: none;
  & img {
    width: 100px;
    height: 100px;
    user-drag: none;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
      color: black;
    }
`