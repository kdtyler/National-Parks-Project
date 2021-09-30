import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">National Park Explorer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/ParksPage/">Parks</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/TrailsPage/">Trails</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search3/">Wildlife</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search2">Biodiversity</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search1">Visitor Stats</NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Search Pages
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem >
                  <NavItem>
                    <NavLink href="/search1/">Search Page 1</NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink href="/search2">Search Page 2</NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
                    <NavLink href="/search3">Search Page 3</NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <NavbarText>CIS550 Project</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;