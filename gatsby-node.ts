import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import BlogPostTemplate from "./src/templates/blog-post"
const path = require(`path`)

// const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

type Person = {
  id: number
  name: string
  age: number
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const seen = new Set()
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            date
            description
            title
          }
          html
          fields {
            slug
          }
        }
      }
    }
  `)
  // result.data.allMarkdownRemark.nodes.forEach( (node : any) => {
  //   reporter.info(node)
  // })
  // console.log(data.allMarkdownRemark.nodes)

  const posts = data.allMarkdownRemark.nodes
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      console.log("POST: ", post)
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

}


// Example of adding custom fields to a node
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // console.log("INSIDE : Gatsby-NODE FILE")
  
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


// export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   const { createNode } = actions

//   // const data = await getSomeData()

//   // data.forEach((person: Person) => {
//   //   const node = {
//   //     ...person,
//   //     parent: null,
//   //     children: [],
//   //     id: createNodeId(`person__${person.id}`),
//   //     internal: {
//   //       type: "Person",
//   //       content: JSON.stringify(person),
//   //       contentDigest: createContentDigest(person),
//   //     },
//   //   }

//   //   createNode(node)
//   // })
// }