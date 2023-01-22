import type { FC } from "react"
import React, { useRef, useCallback } from "react"

import type { MotionProps, Variants } from "framer-motion"
import { motion } from "framer-motion"
import styled from "styled-components"

const DEFAULT_GRADIENT = `radial-gradient(
  closest-side,
  rgba(255, 255, 255, 1) 50%,
  rgba(255, 0, 0, 1) 55%,
  rgba(255, 154, 0, 1) 60%,
  rgba(208, 222, 33, 1) 65%,
  rgba(79, 220, 74, 1) 70%,
  rgba(63, 218, 216, 1) 75%,
  rgba(47, 201, 226, 1) 80%,
  rgba(28, 127, 238, 1) 85%,
  rgba(95, 21, 242, 1) 90%,
  rgba(186, 12, 248, 1) 95%,
  rgba(251, 7, 217, 1) 98%,
  transparent 100%
  )`

export const SpotLightContainer = styled.div<{
  blur?: number
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: -15;
  background: #141414;
  border-radius: 21px;
  overflow: hidden;
  /* filter: blur(${({ blur }) => blur ?? 30}px) saturate(0.85); */
`

const SpotLightComponent: FC<
  MotionProps & {
    blur: number
    background?: string
    coords: Coords
    timesTaller: number
  }
> = ({ blur, timesTaller, coords, background, ...props }) => {
  return (
    <SpotLightContainer>
      <motion.div
        style={{
          // filter: `blur(${blur / 7}px) saturate(0.85)`,
          opacity: 1,
          background: `radial-gradient(
            closest-side, 
            rgba(255, 255, 255, 1) 50%,
            transparent 100%
          )`,
          position: `absolute`,
          pointerEvents: `none`,
          width: `${timesTaller * 70}%`,
          aspectRatio: `1/1`,
          zIndex: -1,
        }}
        {...props}
      />
      <div
        style={{
          position: `absolute`,
          width: `calc(100% - 2px)`,
          height: `calc(100% - 2px)`,
          background: `black`,
          borderRadius: `20px`,
          overflow: `hidden`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <div
          style={{
            width: `90%`,
            height: `70%`,
            background: `black`,
            position: `absolute`,
            pointerEvents: `none`,
            filter: `blur(${blur}px)`,
            zIndex: 5,
          }}
        />
      </div>
      <motion.div
        {...props}
        style={{
          position: `absolute`,
          width: `100%`,
          aspectRatio: `3/2`,
          opacity: 0.2,
          borderRadius: `20px`,
          background: DEFAULT_GRADIENT,
          x: coords.x,
          y: coords.y,
          filter: `blur(${blur}px)`,
        }}
      />
    </SpotLightContainer>
  )
}
export type Coords = { x: number; y: number }
export type Dimensions = { width: number; height: number }
interface SpotLightProps {
  action: VoidFunction
  scaleOnTap: boolean
  defaultScale: number
  opacity: number
  blur: number
  background: string
}
interface SpotLightReturn {
  SpotLight: JSX.Element
  ref: React.RefObject<HTMLDivElement>
  handleMouse: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setTap: React.Dispatch<React.SetStateAction<boolean>>
}

export const useSpotLight = ({
  action,
  scaleOnTap = true,
  defaultScale = 0.8,
  opacity = 0.25,
  background,
}: Partial<SpotLightProps>): SpotLightReturn => {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(defaultScale)
  const [blur, setBlur] = React.useState(30)
  const [tap, setTap] = React.useState(false)
  const [timesTaller, setTimesTaller] = React.useState(1)
  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const height = element.offsetHeight
      const width = element.offsetWidth
      const larger =
        height >= width
          ? { side: `height`, value: height }
          : { side: `width`, value: width }
      const area = width * height
      setBlur(area / (Math.PI * 1.5 * Math.sqrt(area)))

      const x = e.clientX - bounds.left - width / 2
      const y = e.clientY - bounds.top - height / 2
      setCoords({ x, y })
      const scale = x * x + y * y * 2
      const newScale = Math.sqrt(scale) / (larger.value / 4)
      setScale(newScale > 0.8 ? newScale : 0.8)
      const divided = height / width

      setTimesTaller(divided > 1 ? divided : 1)
      action?.()
    },
    [ref.current, setCoords, setScale]
  )
  const SpotLight = (
    <SpotLightComponent
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      custom={{ coords, scale, tap, opacity, scaleOnTap }}
      blur={blur}
      coords={coords}
      background={background}
      timesTaller={timesTaller}
    />
  )
  return { SpotLight, handleMouse, ref, setTap }
}

interface VariantProps {
  coords: Coords
  scale: number
  tap: boolean
  opacity: number
  scaleOnTap: boolean
}
const variants: Variants = {
  initial: ({ coords, scale }: VariantProps) => ({
    opacity: 0,
    x: coords.x,
    y: coords.y,
    scale,
  }),
  animate: ({ coords, scale, tap, scaleOnTap, opacity }: VariantProps) => ({
    x: coords.x,
    y: coords.y,
    scale: tap && scaleOnTap ? 4 : scale,
    opacity: opacity,
    transition: {
      type: `spring`,
      damping: 22,
      stiffness: 300,
      opacity: {
        type: `tween`,
        duration: 0.2,
      },
    },
  }),
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      type: `tween`,
      duration: 0.8,
    },
  },
}
