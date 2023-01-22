import "react-app-polyfill/ie11"
import * as React from "react"

import * as ReactDOM from "react-dom"
import styled from "styled-components"

import { SpotlightItem } from "../src"

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
  color: #ffffffbd;
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
  /* overflow: hidden;
  border-radius: 20px; */
`
const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  > button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: #ffffffbd;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.5s ease-in-out;
    border: 1px solid #ffffff55;
    cursor: pointer;
    overflow: hidden;
    padding: 10px 20px;
    border-radius: 8px;
    transition: color 0.5s ease-in-out, border-color 0.5s ease-in-out;
    :hover {
      border-color: #ffffff91;
    }
  }
  > input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: linear-gradient(to right, #000000 0%, #ffffffa6 100%);
    outline: none;
    height: 32px;
    overflow-y: hidden;
    border-radius: 20px;
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border: 1px solid #ffffff;
      cursor: pointer;
      border-radius: 50%;
    }
  }
`
const ColorContainer = styled.div`
  display: flex;
  gap: 0px;
  transition: transform 0.5s ease-in-out;

  :hover {
    transform: scaleY(1.6);
    > main > div {
      filter: blur(0px);
      opacity: 0.5;
    }
  }
  input[type="color"] {
    -webkit-appearance: none;
    border: none;
    width: 32px;
    height: 32px;
    opacity: 0;
    -webkit-appearance: none;
    cursor: pointer;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border: none;
  }
  > main {
    height: 32px;
    overflow-y: hidden;
    border-radius: 20px;
    position: absolute;
    z-index: -1;
    > div {
      display: flex;
      filter: blur(35px);
      opacity: 1;
      transition: filter 0.5s ease-in-out, opacity 0.5s ease-in-out;
    }
  }
`

type Gradient = {
  color1: string
  color2: string
  color3: string
  color4: string
  color5: string
  color6: string
  color7: string
  color8: string
  color9: string
  color10: string
  color11: string
  color12: string
  color13: string
  color14: string
}

const randomColor = () => {
  const letters = `0123456789ABCDEF`
  let color = `#`
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const App = () => {
  const [opacity, setOpacity] = React.useState(0.4)
  const [gradient, setGradient] = React.useState({
    color1: `#ffffff`,
    color2: `#ffffff`,
    color3: `#ffffff`,
    color4: `#ffffff`,
    color5: `#ff0000`,
    color6: `#ff9a00`,
    color7: `#d0de21`,
    color8: `#4fdc4a`,
    color9: `#3fdad8`,
    color10: `#2fc9e2`,
    color11: `#1c7fee`,
    color12: `#5f15f2`,
    color13: `#ba0cf8`,
    color14: `#fb07d9`,
  })
  const g = `radial-gradient(
    closest-side,
    ${gradient.color1} 12.5%,
    ${gradient.color2} 25%,
    ${gradient.color3} 37.5%,
    ${gradient.color4} 50%,
    ${gradient.color5} 55%,
    ${gradient.color6} 60%,
    ${gradient.color7} 65%,
    ${gradient.color8} 70%,
    ${gradient.color9} 75%,
    ${gradient.color10} 80%,
    ${gradient.color11} 85%,
    ${gradient.color12} 90%,
    ${gradient.color13} 95%,
    ${gradient.color14} 98%,
    transparent 100%
  )`

  const randomize = () => {
    for (let i = 1; i < 15; i++) {
      setGradient((prev) => ({
        ...prev,
        [`color${i}`]: randomColor(),
      }))
    }
  }
  return (
    <Wrapper>
      <ItemWrapper>
        <SpotlightItem background={g} scaleOnTap={false} opacity={opacity}>
          <Demo>Hover me</Demo>
        </SpotlightItem>
      </ItemWrapper>
      <ColorWrapper>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
        <ColorContainer>
          {Object.keys(gradient).map((key) => (
            <input
              key={key}
              type="color"
              value={gradient[key as keyof Gradient]}
              onChange={(e) =>
                setGradient({ ...gradient, [key]: e.target.value })
              }
            />
          ))}
          {[1, 2, 3].map((i) => (
            <main key={i}>
              <div>
                {Object.keys(gradient).map((key) => (
                  <div
                    key={key}
                    style={{
                      width: `32px`,
                      height: `32px`,
                      backgroundColor: gradient[key as keyof Gradient],
                    }}
                  />
                ))}
              </div>
            </main>
          ))}
        </ColorContainer>
        <button onClick={() => randomize()}>randomize</button>
      </ColorWrapper>
    </Wrapper>
  )
}

ReactDOM.render(<App />, document.getElementById(`root`))
