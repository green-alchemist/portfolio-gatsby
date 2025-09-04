import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import styled from "styled-components"

const PostHeader = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PostTitle = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primaryText};
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.m};
`

const PostDate = styled.p`
  font-family: ${props => props.theme.fonts.code};
  color: ${props => props.theme.colors.secondaryText};
`;

// This container will now style the HTML rendered from your markdown
const PostContent = styled.section`
  h2 {
    font-size: 2rem;
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.m};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.m};
    color: ${props => props.theme.colors.secondaryText};
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
  }
  
  strong {
    color: ${props => props.theme.colors.primaryText};
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

const PostFooterNav = styled.nav`
  margin-top: ${props => props.theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BlogPostTemplate: React.FC<PageProps> = (props: any) => {
  const post = props.data.strapiPost
  const { previous, next } = props.data;

  return (
    <article>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{post.publishedAt}</PostDate>
      </PostHeader>
      
      <PostContent 
        dangerouslySetInnerHTML={{ __html: post.body.data.childMarkdownRemark.html }} 
      />

      <hr />

      <PostFooterNav>
        {previous && (
          <Link to={`/blog/${previous.slug}`} rel="prev">
            ← {previous.title}
          </Link>
        )}
        {next && (
          <Link to={`/blog/${next.slug}`} rel="next">
            {next.title} →
          </Link>
        )}
      </PostFooterNav>
    </article>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    strapiPost(id: {eq: $id}) {
      body {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      slug
      title
      publishedAt(formatString: "MMMM DD, YYYY")
    }
    previous: strapiPost(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: strapiPost(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`
