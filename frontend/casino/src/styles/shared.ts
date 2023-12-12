import { css, type theme } from './stitches.config'

// shows on all breakpoints, that higher than a specified one
export const cssShowIn = css({
  variants: {
    showIn: {
      xs: {
        '@xsUp': {
          display: 'none',
        },
      },
      sm: {
        '@smUp': {
          display: 'none',
        },
      },
      md: {
        '@mdUp': {
          display: 'none',
        },
      },
      lg: {
        '@lgUp': {
          display: 'none',
        },
      },
      xl: {
        '@xlUp': {
          display: 'none',
        },
      },
    },
  },
})

export const cssHideIn = css({
  variants: {
    hideIn: {
      xs: {
        '@xs': {
          display: 'none',
        },
      },
      sm: {
        '@sm': {
          display: 'none',
        },
      },
      md: {
        '@md': {
          display: 'none',
        },
      },
      lg: {
        '@lg': {
          display: 'none',
        },
      },
      xl: {
        '@xl': {
          display: 'none',
        },
      },
    },
  },
})

export const cssShowHideIn = css(cssShowIn, cssHideIn)

export type ThemeType = typeof theme

export type BreakpointsOptions = keyof ThemeType['breakpoints']
