import * as React from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"


const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};


const Header = styled.h1`
  white-space: nowrap;
`

const PostContainer = styled.div`
  max-width: ${props => props.max || '80vw'};
  margin: 20px 10vw;

  border: 1px solid red;
  ${Header} {
    
    border: 1px solid blue;
  }
  
`

const PostFooterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-direction: row;
`

const AddBorder = styled(PostFooterContainer)`
  border: 1px solid blue;
  border-radius: 25px;
`

const BlogPostTemplate: React.FC<PageProps> = (props) => {
  const post = props.data.strapiPost

  return (
    <PostContainer>
      <div>
        <Header>{post.title}</Header>
        <div dangerouslySetInnerHTML={{ __html: post.body.data.childMarkdownRemark.html }} />
      </div>
      <PostFooterContainer>

        {post.previous !== null ? <div>Previous</div> : null}
        {post.previous !== null ? <div>Next</div> : null}

      </PostFooterContainer>
      

    </PostContainer>
  )
}

export default BlogPostTemplate

// this bit gets called when gatsby is built
// no data accessible in this function component unless we make these pageQueries
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    strapiPost(id: {eq: $id}) {
      body {
        data {
          body
          childMarkdownRemark {
            html
          }
        }
      }
      slug
      title
      publishedAt
    }
    previous: strapiPost(id: { eq: $previousPostId }) {
      slug
      title
      publishedAt
    }
    next: strapiPost(id: { eq: $nextPostId }) {
      slug
      title
      publishedAt
    }
  }
`