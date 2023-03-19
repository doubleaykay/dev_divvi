import * as React from 'react';
import { Tabs, Tab, TabContent, TabContentBody, TabTitleText } from '@patternfly/react-core';
import { CurrentBill } from '@app/Dashboard/CurrentBill';
// import { TopNav } from '@app/AppLayout/nav';
import { BillList as SavedBills } from './SavedBills/BillList';

class BillTabs extends React.Component<{}, { activeTabKey: number }> {
  handleTabClick: (_event: any, tabIndex: any) => void;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      activeTabKey: 0
    };
    // Toggle currently active tab
    this.handleTabClick = (_event, tabIndex) => {
      this.setState({
        activeTabKey: tabIndex
      });
    };
  }

  render() {
    const currentBillRef = React.createRef();
    const savedBillsRef = React.createRef();

    return (
      <>
        <Tabs
          activeKey={this.state.activeTabKey}
          onSelect={this.handleTabClick}
          // isBox={true}
          role="region"
        >
          <Tab
          eventKey={0}
          title={<TabTitleText>Current Bill</TabTitleText>}
          tabContentRef={currentBillRef}
          />
          <Tab
          eventKey={1}
          title={<TabTitleText>Saved Bills</TabTitleText>}
          tabContentRef={savedBillsRef}
          />
        </Tabs>
          <div>
            <TabContent eventKey={0} id="currentBillTab" ref={currentBillRef as React.RefObject<HTMLElement>}>
              <TabContentBody>
                <CurrentBill />
              </TabContentBody>
            </TabContent>
            <TabContent eventKey={1} id="SavedBillsTab" ref={savedBillsRef as React.RefObject<HTMLElement>} hidden>
              <TabContentBody>
                <SavedBills />
              </TabContentBody>
            </TabContent>
          </div>
      </>
    );
  }
}

const Dashboard: React.FunctionComponent = () => (
  <BillTabs />
)

export { Dashboard };
