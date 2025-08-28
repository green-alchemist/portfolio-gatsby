import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';

const Butt = styled.div`
  border: black solid 1px;
  border-radius: 24px;
  width: fit-content;
  padding: 8px;

  &:hover {
    cursor: pointer;
  }
`


console.log('Components component')

const Components: React.FC = ({ setCount, ...props }) => {
  // const [state, setCount ] = props
  console.log(props)
  return (
    <div>
      {/* <Butt onClick={() => { props.setCount() }}>
        Button {props.counter}
      </Butt> */}

      <Button onClick={() => { setCount() }} variant="contained">Hello {props.counter}</Button>
    </div>
  )
}

export default Components
