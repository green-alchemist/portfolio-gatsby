
import * as React from 'react';
import { Link } from 'gatsby';

// 1. Import the new custom hook
import { useHeaderData } from '../hooks/use-header-data';

import styled from '@emotion/styled';

// --- Styled Components ---

const StyledAppBar = styled.header`
  background: #232129;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  font-family: 'monospace', sans-serif;
  font-weight: 700;
  letter-spacing: .2rem;
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
`;

const NavLinksDesktop = styled.nav`
  display: none; // Hidden on mobile by default
  @media (min-width: 768px) {
    display: flex; // Visible on desktop
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const HamburgerButton = styled.button`
  display: block; // Visible on mobile by default
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101; // Ensure it's above the overlay

  @media (min-width: 768px) {
    display: none; // Hidden on desktop
  }
`;

const MobileNavOverlay = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`;


// Define a type for our navigation links for better code safety
type NavLink = {
  id: string;
  title: string;
  path: string;
};

function ResponsiveAppBar() {
  // 2. Call the custom hook to get the data.
  // The component no longer needs to know about GraphQL.
  const headerData = useHeaderData();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // --- SAFETY CHECK ---
  // This prevents the site from crashing if the data is not available yet.
  const navLinks: NavLink[] = headerData?.navigation?.filter(link => !link.isSocial) || [];
  const siteTitle = headerData?.title || 'KC';


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const ensureAbsolutePath = (path: string) => {
    if (!path) return '/';
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <StyledAppBar>
      <Toolbar>
        <LogoLink to="/">{siteTitle}</LogoLink>

        {/* Desktop Navigation */}
        <NavLinksDesktop>
          {navLinks.map((link) => (
            <NavLinkStyled key={link.id} to={ensureAbsolutePath(link.path)}>
              {link.title}
            </NavLinkStyled>
          ))}
        </NavLinksDesktop>

        {/* Mobile Hamburger Button */}
        <HamburgerButton onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open navigation menu">
          {/* Simple hamburger icon using divs */}
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
        </HamburgerButton>
      </Toolbar>

      {/* Mobile Navigation Overlay */}
      <MobileNavOverlay isOpen={isMobileMenuOpen}>
        {navLinks.map((link) => (
          <NavLinkStyled 
            key={link.id} 
            to={ensureAbsolutePath(link.path)} 
            onClick={() => setMobileMenuOpen(false)} // Close menu on link click
            style={{ fontSize: '1.5rem' }} // Make links larger on mobile overlay
          >
            {link.title}
          </NavLinkStyled>
        ))}
      </MobileNavOverlay>
    </StyledAppBar>
  );
}
export default ResponsiveAppBar;
