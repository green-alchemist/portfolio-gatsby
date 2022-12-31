import * as React from "react"
import { graphql, PageProps } from "gatsby"

const BlogPostTemplate: React.FC<PageProps> = (props) => {
  console.log("blog template", props)
  const post = props.data.strapiPost
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body.data.body }} />
    </div>
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