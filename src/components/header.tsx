import * as React from 'react';
import { Link } from 'gatsby';
import { useHeaderData } from '../hooks/use-header-data';
import styled from 'styled-components';

// --- Styled Components ---

const StyledAppBar = styled.header`
  background: ${props => props.theme.colors.surface};
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  border-bottom: 1px solid #333;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoLink = styled(Link)`
  font-family: ${props => props.theme.fonts.code};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-size: 1.25rem;
`;

const NavLinksDesktop = styled.nav`
  display: none;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.secondaryText};
  text-decoration: none;
  padding: ${props => props.theme.spacing.s} ${props => props.theme.spacing.m};
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
`;

const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${props => props.theme.spacing.s};
  z-index: 101;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavOverlay = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 18, 18, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  z-index: 100;
`;

type NavLink = {
  id: string;
  title: string;
  path: string;
  isSocial: boolean;
};

function ResponsiveAppBar() {
  const headerData = useHeaderData();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: NavLink[] = headerData?.navigation?.filter(link => !link.isSocial) || [];
  const siteTitle = headerData?.title || 'KC';

  const ensureAbsolutePath = (path: string) => {
    if (!path) return '/';
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <StyledAppBar>
      <Toolbar>
        <LogoLink to="/">{siteTitle}</LogoLink>
        <NavLinksDesktop>
          {navLinks.map((link) => (
            <NavLinkStyled key={link.id} to={ensureAbsolutePath(link.path)}>
              {link.title}
            </NavLinkStyled>
          ))}
        </NavLinksDesktop>
        <HamburgerButton onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open navigation menu">
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
        </HamburgerButton>
      </Toolbar>
      <MobileNavOverlay isOpen={isMobileMenuOpen}>
        {navLinks.map((link) => (
          <NavLinkStyled
            key={link.id}
            to={ensureAbsolutePath(link.path)}
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.5rem' }}
          >
            {link.title}
          </NavLinkStyled>
        ))}
      </MobileNavOverlay>
    </StyledAppBar>
  );
}

export default ResponsiveAppBar;

