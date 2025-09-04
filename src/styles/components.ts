import styled from '@emotion/styled';
import { Link } from 'gatsby';

// --- Global Layout Components ---

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.l};
`;

// --- Header Components (`header.tsx`) ---

export const StyledAppBar = styled.header`
  background: ${props => props.theme.colors.surface};
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  border-bottom: 1px solid #333;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const LogoLink = styled(Link)`
  font-family: ${props => props.theme.fonts.code};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-size: 1.25rem;
`;

export const NavLinksDesktop = styled.nav`
  display: none;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    gap: 1rem;
  }
`;

export const NavLinkStyled = styled(Link)`
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

export const HamburgerButton = styled.button`
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

export const MobileNavOverlay = styled.nav<{ isOpen: boolean }>`
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

