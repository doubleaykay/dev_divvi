import * as React from 'react';
import {
  Page, PageHeader
} from '@patternfly/react-core';
import logo from '@app/bgimages/Divvi-Logo.svg';
import { TopNav } from '@app/AppLayout/nav'

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const Header = (
    // <PageHeader topNav={TopNav}/>
    // <PageHeader logo={<img src={logo} alt="Divvi Logo"/>}/>

    <PageHeader logo={<img src={logo} alt="Divvi Logo" />} />
  );

  const pageId = 'primary-app-container';

  return (
    <Page
      mainContainerId={pageId}
      header={Header}>
      {/* <TopNav /> */}
      {children}
    </Page>
  );
};

export { AppLayout };
