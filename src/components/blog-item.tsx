import { Link, navigate } from 'gatsby';
import React from 'react'
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

`

const BlogItem: React.FC = ({data, ...props}) => {

  console.log(data.slug)
  return (
    <ItemContainer onClick={() => {navigate(data.slug)}}>
      <span>{data.title}</span>
      <Link to={data.slug}>link</Link>
    </ItemContainer>
  );
}

export default BlogItem
