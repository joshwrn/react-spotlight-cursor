import type { FC } from "react"
import React, { useState } from "react"

import type { MotionProps } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FlattenInterpolation, ThemeProps } from "styled-components"
import styled from "styled-components"

import { StyledSpotLight, useSpotLight } from "./Components/Spotlight"

export type CSSProps = FlattenInterpolation<ThemeProps<unknown>> | undefined

const Wrapper = styled(motion.div)<{ css: CSSProps }>`
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  ${({ css }) => css}
`

export const SpotlightItem: FC<
  MotionProps &
    React.HTMLAttributes<HTMLDivElement> & {
      children: React.ReactNode
      css?: CSSProps
      opacity?: number
      scaleOnTap?: boolean
      background?: string
    }
> = ({ children, css, opacity, scaleOnTap, background, ...props }) => {
  const [hover, setHover] = useState(false)
  const { ref, handleMouse, SpotLight, setTap } = useSpotLight({
    opacity,
    scaleOnTap,
    background,
  })
  return (
    <Wrapper
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => (setHover(false), setTap(false))}
      onMouseMove={handleMouse}
      onMouseDown={() => setTap(true)}
      css={css}
      {...props}
    >
      {children}
      <AnimatePresence>{hover && SpotLight}</AnimatePresence>
    </Wrapper>
  )
}
