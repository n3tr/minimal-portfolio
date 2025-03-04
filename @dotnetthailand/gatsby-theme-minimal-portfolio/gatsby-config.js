const urljoin = require("url-join");

// Make sure that pathPrefix is not empty
const validatedPathPrefix = (config) => config.pathPrefix === "" ? "/" : config.pathPrefix;

module.exports = ({ config }) => {
  // https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#sitemetadata
  const siteMetadata = {
    ...config,
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      title: config.siteTitle,
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      image_url: `${urljoin(config.siteUrl, config.pathPrefix)}/logos/logo-512.png`,
      description: config.siteDescription,
      copyright: config.copyright,
    },
  };

  return {
    pathPrefix: validatedPathPrefix(config),
    siteMetadata: siteMetadata,
    plugins: [
      "gatsby-plugin-typescript",
      "gatsby-plugin-styled-components",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-lodash",
      {
        resolve: 'gatsby-plugin-pathdata',
        options: {
          matchNodeType: 'MarkdownRemark',
          extract: [
            {
              name: 'date',
              selector: /.+\/(\d+-\d+-\d+)-[\w-]+\.md$/,
              replacer: '$1'
            },
            {
              name: 'filename',
              selector: /.+\/(\d+-\d+-\d+)-([\w-]+)\.md$/,
              replacer: '$2'
            }
          ]
        }
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "assets",
          path: `${__dirname}/static/`,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "posts",
          path: config.contentPath,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "data",
          path: config.dataPath,
        },
      },
      {
        resolve: `gatsby-transformer-yaml`,
      },
      {
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-relative-images`,
            },
            {
              resolve: "gatsby-remark-images",
              options: {
                maxWidth: 700,
              },
            },
            {
              resolve: "gatsby-remark-responsive-iframe",
            },
            "gatsby-remark-copy-linked-files",
            "gatsby-remark-autolink-headers",
            "gatsby-remark-prismjs",
          ],
        },
      },
      {
        resolve: "gatsby-plugin-google-analytics",
        options: {
          trackingId: config.googleAnalyticsID,
        },
      },
      {
        resolve: "gatsby-plugin-nprogress",
        options: {
          color: config.themeColor,
        },
      },
      "gatsby-plugin-image",
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      "gatsby-plugin-catch-links",
      "gatsby-plugin-twitter",
      "gatsby-plugin-sitemap",
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          name: config.siteTitle,
          short_name: config.siteTitleShort,
          description: config.siteDescription,
          start_url: validatedPathPrefix(config),
          background_color: config.backgroundColor,
          theme_color: config.themeColor,
          display: "minimal-ui",
          icons: [
            {
              src: "/logos/logo-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/logos/logo-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      },
      "gatsby-plugin-offline",
      {
        resolve: "gatsby-plugin-feed",
        options: {
          setup(ref) {
            const ret = ref.query.site.siteMetadata.rssMetadata;
            ret.allMarkdownRemark = ref.query.allMarkdownRemark;
            ret.generator = "GatsbyJS Advanced Starter";
            return ret;
          },
          query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
          feeds: [
            {
              serialize(ctx) {
                const { rssMetadata } = ctx.query.site.siteMetadata;
                return ctx.query.allMarkdownRemark.edges.map((edge) => ({
                  categories: edge.node.frontmatter.tags,
                  date: edge.node.fields.date,
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  url: rssMetadata.site_url + edge.node.fields.slug,
                  guid: rssMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { author: config.profile.email },
                  ],
                }));
              },
              query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      date
                      tags
                    }
                  }
                }
              }
            }
          `,
              output: config.siteRss,
              title: config.siteRssTitle,
            },
          ],
        },
      },
    ], // end plugins
  };

};
