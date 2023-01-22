const colors = {
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
}
type ColorKey = keyof typeof colors
export const colorsMap = Object.keys(colors)
  .map((key) => ({
    [key as ColorKey]: {
      value: colors[key as ColorKey],
    },
  }))
  .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<
  ColorKey,
  { value: string }
>

export const getGradient = (gradient: Record<ColorKey, string>): string => {
  return `radial-gradient(
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
}
