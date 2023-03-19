import React from 'react';
import { Nav, NavItem, NavList, PageNavigation } from '@patternfly/react-core';

export const TopNav: React.FunctionComponent = () => {
    const [activeItem, setActiveItem] = React.useState(0);

    const onSelect = (result: { itemId: number | string }) => {
        setActiveItem(result.itemId as number);
    };

    return (
        <PageNavigation>
            <Nav onSelect={onSelect} variant='tertiary' aria-label="Global nav" >
                <NavList>
                    <NavItem
                        preventDefault
                        key={1}
                        itemId={1}
                        isActive={activeItem === 1}
                        id={`nav-current-bill`}
                        to={`#current-bill`}
                    >
                        Current Bill
                    </NavItem>
                    <NavItem
                        preventDefault
                        key={2}
                        itemId={2}
                        isActive={activeItem === 2}
                        id={`nav-saved-bills`}
                        to={`#saved-bills`}
                    >
                        Saved Bills
                    </NavItem>
                </NavList>
            </Nav>
        </PageNavigation>
    );
};