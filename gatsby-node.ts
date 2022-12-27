import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

type Person = {
  id: number
  name: string
  age: number
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const seen = new Set()

  const { data }: any = await graphql(`
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

  reporter.info("Inside createPages")

}


// Example of adding custom fields to a node
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  console.log("INSIDE : Gatsby-NODE FILE")
  
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