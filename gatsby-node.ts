import type { GatsbyNode } from "gatsby"
import path from "node:path"

const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

interface PostNode {
  id: string;
  slug: string;
}

interface QueryResult {
  allStrapiPost: {
    nodes: PostNode[];
  };
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query BlogPostQuery {
      allStrapiPost(sort: { publishedAt: DESC }) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (!data) {
    throw new Error("Error fetching posts from Strapi");
  }

  const posts = (data as any).allStrapiPost.nodes;

  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      if (post && post.slug !== null) {
        createPage({
          path: `blog/${post.slug}`,
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

// export const onCreatePage: GatsbyNode["onCreatePage"] = async ({ page, actions }) => {
//   const { createPage } = actions

//   if (page.path === '/') {
//     page.matchPath = '/*'
//     createPage(page)
//   }
// }
// In gatsby-node.ts, add this after your createPages export
export const onCreatePage: GatsbyNode["onCreatePage"] = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for client-only routes.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";
    // Update the page.
    createPage(page);
  }
};

// Example of adding custom fields to a node
// export const onCreateNode: GatsbyNode["onCreateNode"] = async ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // console.log("INSIDE : Gatsby-Node internal type: ", node.internal.type)
//   // if (node.internal.type !== 'SitePlugin') {
//   //   // console.log("Node OBJ: ", node)

//   // }
//   // if (node.internal.type === `MarkdownRemark`) {
//   //   // const value = createFilePath({ node, getNode })
//   //   // console.log("VALUE: ", value)

//   //   // createNodeField({
//   //   //   name: `slug`,
//   //   //   node,
//   //   //   "value":"value",
//   //   // })
//   // }
// }




/*  
  Gatsby-node api reference 
  https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
*/

// Example for sourceNodes
// export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   const { createNode } = actions

//   const myData = {
//     key: 123,
//     foo: `The foo field of my node`,
//     bar: `Baz`
//   }
//   const nodeContent = JSON.stringify(myData)

//   const nodeMeta = {
//     id: createNodeId(`my-data-${myData.key}`),
//     parent: null,
//     children: [],
//     internal: {
//       type: `MyNodeType`,
//       mediaType: `text/html`,
//       content: nodeContent,
//       contentDigest: createContentDigest(myData)
//     }
//   }
//   const node = Object.assign({}, myData, nodeMeta)

//   console.log(`Inside Source Nodes node: ${JSON.stringify(node)}`)

//   createNode(node)
// }