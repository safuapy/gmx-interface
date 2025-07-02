/* eslint-disable */

const range = require("lodash/range");
const fromPairs = require("lodash/fromPairs");
const merge = require("lodash/merge");
const defaultConfig = require("tailwindcss/defaultConfig");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");

/**
 * 2025 Techno-Punk Crypto Color Palette
 * Modern gradients, neon accents, and futuristic aesthetics
 */
const colors = {
  // Primary Purple Gradient System
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff", 
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  // Neon Accent Colors
  neon: {
    purple: "#b026ff",
    pink: "#ff0080",
    cyan: "#00ffff",
    green: "#00ff41",
    yellow: "#ffff00",
    orange: "#ff6b35",
    blue: "#0080ff",
  },
  // Dark Cyberpunk Backgrounds
  cyber: {
    50: "rgba(255, 255, 255, 0.95)",
    100: "#e2e8f0",
    200: "#cbd5e1",
    300: "#94a3b8",
    400: "#64748b",
    500: "#475569",
    600: "#334155",
    700: "#1e293b",
    800: "#0f172a",
    900: "#020617",
    950: "#000000",
  },
  // Gradient Backgrounds
  gradient: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    cyber: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    neon: "linear-gradient(135deg, #b026ff 0%, #ff0080 50%, #00ffff 100%)",
    glass: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  },
  // Legacy colors for compatibility
  blue: {
    300: "#7885ff",
    400: "#4d5ffa", 
    500: "#3d51ff",
    600: "#2d42fc",
    700: "#2e3dcd",
  },
  "cold-blue": {
    500: "#3a3f79",
    700: "#282b54",
    900: "#1e203e",
  },
  "pale-blue": {
    100: "rgba(180,187,255, 0.1)",
    600: "rgba(180,187,255, 0.6)",
  },
  slate: {
    100: "#a0a3c4",
    500: "#3e4361",
    600: "#373c58",
    700: "#23263b",
    750: "#17182c",
    800: "#16182e",
    900: "#101124",
    950: "#08091b",
  },
  gray: {
    50: "rgba(255, 255, 255, 0.95)",
    100: "#e7e7e9",
    200: "#cfcfd3",
    300: "#b7b8bd",
    400: "#9fa0a7",
    500: "#878891",
    600: "#70707c",
    700: "#585866",
    800: "rgba(255, 255, 255, 0.2)",
    900: "rgba(255, 255, 255, 0.1)",
    950: "rgba(255, 255, 255, 0.05)",
  },
  yellow: {
    300: "#ffe166",
    500: "#f3b50c",
  },
  red: {
    400: "#ff637a",
    500: "#FF506A",
    700: "#B33055",
  },
  green: {
    300: "#56dba8",
    400: "#8CF3CB",
    500: "#0FDE8D",
    600: "#1F3445",
    700: "#0FDE8D",
    800: "#178969",
  },
  white: "#ffffff",
  black: "#000000",
  stroke: {
    primary: "#252A47",
  },
  fill: {
    tertiary: "#B4BBFF1A",
  },
};

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 */
function injectColorsPlugin({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = "") {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const visualColorKey = colorKey === "DEFAULT" ? "" : `-${colorKey}`;

      const newVars =
        typeof value === "string"
          ? { [`--color${colorGroup}${visualColorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ":root": extractColorVars(theme("colors")),
  });
}

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 */
function customUtilsPlugin({ addUtilities, matchUtilities, matchVariant, addVariant, theme }) {
  addUtilities({
    ".scrollbar-hide": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });

  addVariant("desktop-hover", [`@media (hover: hover) {&:not(:active):hover}`]);
  addVariant("gmx-hover", [`@media (hover: hover) {&:hover}`, `@media (hover: none) {&:active}`]);
  addVariant("group-gmx-hover", [
    `@media (hover: hover) {:merge(.group):hover &}`,
    `@media (hover: none) {:merge(.group):active &}`,
  ]);

  // Modern gradient utilities
  addUtilities({
    ".text-input-bg": {
      background:
        "linear-gradient(90deg, var(--color-cyber-800) 0%, color-mix(in srgb, var(--color-purple-600) 20%, transparent) 100%)",
    },
    ".bg-gradient-primary": {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    ".bg-gradient-secondary": {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    ".bg-gradient-cyber": {
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    },
    ".bg-gradient-neon": {
      background: "linear-gradient(135deg, #b026ff 0%, #ff0080 50%, #00ffff 100%)",
    },
    ".bg-glass": {
      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    ".text-glow": {
      textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
    },
    ".box-glow": {
      boxShadow: "0 0 20px rgba(176, 38, 255, 0.3), 0 0 40px rgba(176, 38, 255, 0.1)",
    },
    ".border-glow": {
      border: "1px solid rgba(176, 38, 255, 0.3)",
      boxShadow: "0 0 10px rgba(176, 38, 255, 0.2), inset 0 0 10px rgba(176, 38, 255, 0.1)",
    },
  });
}

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 * @See https://www.notion.so/gmxio/Fonts-Clean-Up-13303574745d8015b115e03426827f3c
 */
function fontComponentsPlugin({ addComponents, addBase }) {
  addBase({
    ":root": {
      "--font-size-h1": "3.4rem",
      "--font-size-h2": "2.4rem",
      "--font-size-body-large": "1.6rem",
      "--font-size-body-medium": "1.4rem",
      "--font-size-body-small": "1.2rem",
      "--font-size-caption": "1rem",

      "--line-height-h1": "34px",
      "--line-height-h2": "24px",
      "--line-height-body-large": "2.1rem",
      "--line-height-body-medium": "1.8rem",
      "--line-height-body-small": "1.6rem",
      "--line-height-caption": "1.4rem",
    },
  });

  addComponents({
    ".text-h1": {
      fontSize: "3.4rem",
      lineHeight: "auto",
    },
    ".text-h2": {
      fontSize: "2.4rem",
      lineHeight: "auto",
    },
    ".text-body-large": {
      fontSize: "1.6rem",
      lineHeight: "2.1rem",
    },
    ".text-body-medium": {
      fontSize: "1.4rem",
      lineHeight: "1.8rem",
    },
    ".text-body-small": {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
    ".text-caption": {
      fontSize: "1rem",
      lineHeight: "1.4rem",
    }
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // @see https://tailwindcss.com/docs/customizing-spacing
    spacing: fromPairs(range(0, 96 + 1).map((spacing) => [spacing, `${spacing}px`])),
    borderRadius: merge(fromPairs(range(0, 96 + 1).map((borderRadius) => [borderRadius, `${borderRadius}px`])), {
      full: "9999px",
    }),
    fontSize: {
      12: "1.2rem",
      14: "1.4rem",
      15: "1.5rem",
      16: "1.6rem",
      24: "2.4rem",
      34: "3.4rem",
    },
    lineHeight: {
      1: "1",
      2: "2",
      // Normal is browser dependent. See https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#normal
      base: "normal",
    },
    // @see https://tailwindcss.com/docs/customizing-colors
    colors: colors,
    textDecorationColor: colors,
    placeholderColor: {
      ...colors,
      gray: "rgb(117, 117, 117)",
    },
    // @see https://tailwindcss.com/blog/tailwindcss-v3-2#max-width-and-dynamic-breakpoints
    // "these features will only be available if your project uses a simple screens configuration."
    // So we just copy the default screens config
    screens: defaultConfig.theme.screens,
    extend: {
      gridTemplateColumns: fromPairs(
        range(200, 501, 50).map((space) => [`auto-fill-${space}`, `repeat(auto-fill, minmax(${space}px, 1fr))`])
      ),
    },
  },
  plugins: [injectColorsPlugin, customUtilsPlugin, fontComponentsPlugin],
};
