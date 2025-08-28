import { Link, navigate } from 'gatsby';
import React from 'react'
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: auto;
  border: 1px solid red;

  div {
    white-space: nowrap;
  }
`

const BlogItem: React.FC = ({ data, ...props }) => {
  console.log(new Date(data.publishedAt))
  return (
    <ItemContainer onClick={() => {navigate(data.slug)}}>
      <div>{data.publishedAt}</div>
      <div>{data.title}</div>
      <Link to={data.slug}>link</Link>
    </ItemContainer>
  );
}

export default BlogItem
