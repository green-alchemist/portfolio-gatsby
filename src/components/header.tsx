import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useHeaderData } from '../hooks/use-header-data';
import { useThemeContext } from '../context/ThemeContext';

// --- Styled Components ---

const StyledAppBar = styled.header`
  background: ${props => props.theme.colors.surface};
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-bottom: 1px solid ${props => props.theme.colors.background};
  transition: background-color 0.3s;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  letter-spacing: .2rem;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-size: 1.25rem;
`;

const NavLinksDesktop = styled.nav`
  display: none; // Hidden on mobile
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    gap: 1rem;
  }
`;

const NavLinkStyled = styled(Link)`
  color: ${props => props.theme.colors.primaryText};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primaryText};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: block;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primaryText};
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
  position: relative;
  width: 24px;
  height: 24px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none; // Hidden on desktop
  }

  div {
    width: 24px;
    height: 2px;
    background: ${props => props.theme.colors.primaryText};
    transition: all 0.3s ease;
    position: absolute;
    left: 0;

    &:nth-of-type(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-5px)'};
    }
    &:nth-of-type(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }
    &:nth-of-type(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(5px)'};
    }
  }
`;

const MobileNavOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  z-index: 100;
`;

const MobileNavLinks = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

type NavLinkType = {
  id: string;
  title: string;
  path: string;
};

function ResponsiveAppBar() {
  const headerData = useHeaderData();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useThemeContext();

  const navLinks: NavLinkType[] = headerData?.navigation?.filter(link => !link.isSocial) || [];
  const siteTitle = headerData?.title || 'KC';

  const ensureAbsolutePath = (path: string) => {
    if (!path) return '/';
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <LogoLink to="/">{siteTitle}</LogoLink>

          <NavContainer>
            <NavLinksDesktop>
              {navLinks.map((link) => (
                <NavLinkStyled key={link.id} to={ensureAbsolutePath(link.path)}>
                  {link.title}
                </NavLinkStyled>
              ))}
            </NavLinksDesktop>
            
            <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </ThemeToggleButton>

            <HamburgerButton 
              isOpen={isMobileMenuOpen}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label="Toggle navigation menu"
            >
              <div></div>
              <div></div>
              <div></div>
            </HamburgerButton>
          </NavContainer>
        </Toolbar>
      </StyledAppBar>

      <MobileNavOverlay 
        isOpen={isMobileMenuOpen} 
        onClick={() => setMobileMenuOpen(false)}
      >
        <MobileNavLinks onClick={(e) => e.stopPropagation()}>
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
        </MobileNavLinks>
      </MobileNavOverlay>
    </>
  );
}
export default ResponsiveAppBar;

