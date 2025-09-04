import * as React from "react"
import { graphql, PageProps } from "gatsby"
import BlogItem from "../components/shared/blog-item"

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

// The component receives data directly from the page query below
const BlogIndexPage: React.FC<BlogIndexProps> = ({ data }: BlogIndexProps) => {
  const posts = data.allStrapiPost.nodes;

  return (
    <div>
      <h1>Blog Page</h1>
      {posts.map((post) => (
        <BlogItem key={post.id} data={post} />
      ))}
    </div>
  )
}

export default BlogIndexPage

// This is a Page Query, which can only be exported from a page component.
// Gatsby automatically runs this query and passes the result as `data` props.
export const pageQuery = graphql`
  query AllBlogPostsQuery {
    allStrapiPost(sort: { publishedAt: DESC }) {
      nodes {
        id
        slug
        title
        publishedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
