import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

// The entire container is now a Gatsby Link for better accessibility and SEO.
const ItemContainer = styled(Link)`
  display: block;
  text-decoration: none;
  padding: ${props => props.theme.spacing.l};
  margin-bottom: ${props => props.theme.spacing.l};
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid ${props => props.theme.colors.surface};

  &:hover {
    background-color: ${props => props.theme.colors.surface};
  }
`;

const PostTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primaryText};
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.s};
`;

const PostDate = styled.p`
  font-family: ${props => props.theme.fonts.code};
  color: ${props => props.theme.colors.secondaryText};
  font-size: 0.9rem;
`;

// Define the shape of the data prop for type safety
interface BlogItemProps {
  data: {
    slug: string;
    title: string;
    publishedAt: string;
  };
}

const BlogItem: React.FC<BlogItemProps> = ({ data }: BlogItemProps) => {
  // We no longer need the navigate function, as the Link component handles it.
  return (
    <ItemContainer to={`/blog/${data.slug}`}>
      <PostTitle>{data.title}</PostTitle>
      <PostDate>{data.publishedAt}</PostDate>
    </ItemContainer>
  );
};

export default BlogItem;
