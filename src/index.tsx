import type { FC } from "react"
import React, { useState } from "react"

import type { MotionProps, Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FlattenInterpolation, ThemeProps } from "styled-components"
import styled from "styled-components"

import { useSpotLight } from "./Components/Spotlight"

export type CSSProps = FlattenInterpolation<ThemeProps<unknown>> | undefined

const Wrapper = styled(motion.div)<{ css: CSSProps }>`
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  ${({ css }) => css}
`

const Placeholder = styled(motion.div)<{ blur: number; opacity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 21px;
  overflow: hidden;
  background: rgba(0, 0, 0, ${({ opacity }) => opacity});
  backdrop-filter: blur(${({ blur }) => blur}px);
  z-index: -16;
`

export const SpotlightItem: FC<
  MotionProps &
    React.HTMLAttributes<HTMLDivElement> & {
      children: React.ReactNode
      backgroundBlur?: number
      backgroundOpacity?: number
      css?: CSSProps
      opacity?: number
      scaleOnTap?: boolean
      gradient?: string
    }
> = ({
  children,
  css,
  opacity,
  scaleOnTap,
  gradient,
  backgroundBlur = 15,
  backgroundOpacity = 0.6,
  ...props
}) => {
  const [hover, setHover] = useState(false)
  const { ref, handleMouse, SpotLight, setTap } = useSpotLight({
    opacity,
    scaleOnTap,
    gradient,
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
      <AnimatePresence>
        {hover && (
          <Placeholder
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            blur={backgroundBlur}
            opacity={backgroundOpacity}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{hover && SpotLight}</AnimatePresence>
    </Wrapper>
  )
}

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: `tween`,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: `tween`,
      duration: 0.8,
    },
  },
}
