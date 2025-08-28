import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  color: #2d2f31;
  display: flex;
  justify-content: center;
`

export default function Footer() {
  return (
    <Styled>

      <footer>
        <p className="center">&copy; Kyle Conley {new Date().getFullYear()}</p>
      </footer>

    </Styled>
  );
}