import React, { useState } from 'react';
import styled from 'styled-components'

const Root = styled.div`

`

const Body = () => {
  const [apple] = useState()

  return (
    <Root>
      <div>Hello World</div>
    </Root>
  )
}

export default { Body }
