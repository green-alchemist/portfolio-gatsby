import * as React from "react"
import { graphql, PageProps, useStaticQuery } from "gatsby"
import { blob } from "stream/consumers"
import BlogItem from "../components/blog-item"

interface BlogItem {
  slug: string
  title: string
  publishedAt: Date | string
  updatedAt: Date | string
}

const BlogPostTemplate: React.FC<PageProps> = (props) => {
  const gatsbyData = useStaticQuery(graphql`
    query HeaderQuery{
      allStrapiPost {
        nodes {
          id
          body {
            data {
              childMarkdownRemark {
                html
              }
              body
              id
            }
          }
          slug
          title
          publishedAt
          updatedAt
          categories {
            id
          }
        }
      }
    }
  `)

  // const post = props.data.strapiPost
  console.log(`Blog Page : `, gatsbyData)
  const blogList = gatsbyData.allStrapiPost.nodes.map((element: BlogItem) => {
    return <BlogItem key={element.slug} data={element} ></BlogItem>
  })
  return (
    <div>
      {
        blogList
      }
    </div>
  )
}

export default BlogPostTemplate
