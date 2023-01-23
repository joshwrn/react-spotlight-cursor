import "react-app-polyfill/ie11"
import * as React from "react"

import { useControls } from "leva"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import "./global.css"

import { SpotlightItem } from "../."
import { colorsMap, getGradient } from "./gradient"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  gap: 50px;
  color: #ffffffe6;
  font-family: sans-serif;
  user-select: none;
`
const Demo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 200px;
  resize: both;
  min-width: 100px;
  min-height: 100px;
  max-width: 90vw;
  max-height: 60vh;
  margin: 0;
  padding: 0;
  cursor: pointer;
`
const ItemWrapper = styled.div`
  display: flex;
  p {
    transition: opacity 2s ease-in-out;
  }
  :hover {
    p {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }
  }
`

const App = () => {
  const [opacity, setOpacity] = React.useState(0.5)
  useControls({
    opacity: {
      value: opacity,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v) => setOpacity(v),
    },
  })
  const gradientControls = useControls(`Gradient`, colorsMap, {
    collapsed: true,
  })
  const gradient = getGradient(gradientControls)

  return (
    <Wrapper>
      <ItemWrapper>
        <SpotlightItem gradient={gradient} scaleOnTap={false} opacity={opacity}>
          <Demo>
            <p>Hover me</p>
          </Demo>
        </SpotlightItem>
      </ItemWrapper>
    </Wrapper>
  )
}

ReactDOM.render(<App />, document.getElementById(`root`))
