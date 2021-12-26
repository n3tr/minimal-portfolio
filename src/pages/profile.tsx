import React from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import styled from 'styled-components';
import Layout from "../layout/PageLayout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";
import UserLinks from "../components/UserLinks/UserLinks";
import { onMobile, onTablet } from "../themes/responsive";

function ProfilePage(props: PageProps) {
  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <h2>Profile</h2>
        <FlexContainer>
          <Column width="350px">
            efefewf
          </Column>
          <Column>
            <p>Vestibulum tempus faucibus felis, nec tristique justo eleifend at. Vivamus sed est mattis, ullamcorper eros non, suscipit augue. Sed vestibulum dapibus nisi ut luctus. Nullam varius urna non facilisis ultricies. In accumsan lectus efficitur nulla aliquam dapibus. Nunc ultrices vestibulum sem et hendrerit. Fusce vel bibendum enim.
            </p>
            <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sagittis vulputate sodales. Nulla rhoncus turpis sed lectus varius, a dapibus nisl tincidunt. Maecenas dictum, odio nec tempus fringilla, nibh massa vehicula sem, ut congue turpis ante vitae tortor. Nam pretium dui in tortor laoreet, convallis gravida lacus volutpat. Duis tellus lectus, dictum eu metus ac, accumsan congue ex. Suspendisse aliquam, ligula sit amet facilisis fringilla, mauris nisl placerat turpis, ut egestas ante orci ac justo. Phasellus venenatis ipsum vel erat commodo, in tristique mi eleifend. Integer velit lorem, convallis vitae suscipit nec, pretium quis mauris.</p>
            <UserLinks config={config} size="30px" spacing="7px"/>
          </Column>
          
        </FlexContainer>
      </div>
    </Layout>
  );
}

const FlexContainer = styled.div`
  display: flex;

  ${onMobile} {
    flex-wrap: wrap;
  }

`;

interface IColumnProp {
  width?: string
}

const Column = styled.div<IColumnProp>` 
  width: ${({ width }) => (width ? width : '100%')}; 
  ${onMobile} {
    width: 100%;
  };
`;


export default ProfilePage;
