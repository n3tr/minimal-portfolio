import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import PostListing from "../components/PostListing/PostListing";
import Hero from "../components/Hero";
import SEO from "../components/SEO/SEO";
import styled from 'styled-components';
import ConfigContext from "../context/ConfigContext";

function Landing({ data }) {
  const config = useContext(ConfigContext);
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <Hero />
          <Header>All articles</Header>
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    </Layout>
  );
}

export default Landing;

const Header = styled.h4`
  font-family: var(--font-family-inter);  
  /* font-weight: 500; */
  font-size: 1.4rem;
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;
