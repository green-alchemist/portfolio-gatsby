import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import styled from "styled-components"

// --- Styled Components ---

const PostArticle = styled.article`
  width: 100%;
`;

const PostHeader = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primaryText};
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.m};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.25rem;
  }
`

const PostDate = styled.p`
  font-family: ${props => props.theme.fonts.code};
  color: ${props => props.theme.colors.secondaryText};
  font-size: 0.9rem;
`;

// This container will style the HTML rendered from your markdown
const PostContent = styled.section`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.secondaryText};

  h2, h3, h4 {
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.primaryText};
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.m};
    line-height: 1.3;
  }

  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }

  p {
    margin-bottom: ${props => props.theme.spacing.m};
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  
  strong {
    color: ${props => props.theme.colors.primaryText};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  ul, ol {
    margin-left: ${props => props.theme.spacing.l};
    margin-bottom: ${props => props.theme.spacing.m};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.s};
  }
`;

const PostFooterNav = styled.nav`
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.l};
  border-top: 1px solid ${props => props.theme.colors.surface};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.heading};
`;

const BlogPostTemplate: React.FC<PageProps> = (props: any) => {
  const post = props.data.strapiPost
  const { previous, next } = props.data;

  return (
    <PostArticle>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{post.publishedAt}</PostDate>
      </PostHeader>
      
      <PostContent 
        dangerouslySetInnerHTML={{ __html: post.body.data.childMarkdownRemark.html }} 
      />

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
    </PostArticle>
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

