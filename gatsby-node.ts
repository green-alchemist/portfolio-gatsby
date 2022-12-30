import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import assert from "node:assert"
import path from "node:path"
// const path = require(`path`)
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

// type Person1 = {
//   id: number
//   name: string
//   age: number
// }
// interface Person {
//   id: number
//   name: string
//   age: number
//   family: Person1
// }

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  // const seen = new Set()
  const { createPage } = actions

  const { data } = await graphql(`
    query BlogPostQuery{
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

  if (data.errors) throw data.errors

  const posts = data.allMarkdownRemark.nodes
  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      // const path = post?.fields?.slug
      // // just in case, we are not allowing same names
      // if (seen.has(path)) {
      //   assert.fail(`"${path}" already exists`)
      // }
      // seen.add(path)
      console.log("POST #: ", index)
      // console.log("POST Fields: ", data)
      // console.log("POST internal: ", data)


      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      // context gets passed to the page function component for use in the pageQuery
      // component seems to be looking for a file path and not the actual function component which is exported
      if (post && post.fields && post.fields.slug !== null) {

        createPage({
          path: post.fields.slug,
          component: blogPost,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
          },
        })

      }
    })
  }
}


// Example of adding custom fields to a node
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // console.log("INSIDE : Gatsby-Node internal type: ")
  
  if (node.internal.type === `MarkdownRemark`) {
    // const value = createFilePath({ node, getNode })
    // console.log("VALUE: ", value)

    createNodeField({
      name: `slug`,
      node,
      "value":"value",
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