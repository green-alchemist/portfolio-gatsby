import * as React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
import BlogItem from "../components/shared/blog-item"

// --- Styled Components ---

const BlogIndexContainer = styled.div`
  width: 100%;
`;

const BlogHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  padding-bottom: ${props => props.theme.spacing.m};
`;

const PostList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.l};
`;

// --- Component ---

// Define the shape of the data we expect from our page query
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
}

interface BlogIndexProps {
  data: {
    allStrapiPost: {
      nodes: BlogPost[];
    }
  }
}

const BlogIndexPage: React.FC<BlogIndexProps> = ({ data }: BlogIndexProps) => {
  const posts = data.allStrapiPost.nodes;

  return (
    <BlogIndexContainer>
      <BlogHeader>The Alchemical Log</BlogHeader>
      <PostList>
        {posts.map((post) => (
          <BlogItem key={post.id} data={post} />
        ))}
      </PostList>
    </BlogIndexContainer>
  )
}

export default BlogIndexPage

export const pageQuery = graphql`
  query BlogIndex {
    allStrapiPost(sort: { publishedAt: DESC }) {
      nodes {
        id
        title
        slug
        publishedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

