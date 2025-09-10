module.exports = {
  presets: [["next/babel", { "preset-react": { runtime: "automatic" } }]],
  plugins: [
    "babel-plugin-macros",
    ["babel-plugin-styled-components", { ssr: true }],
  ],
  // Important: let SWC handle the Edge function at src/pages/api/og.tsx
  // to avoid incompatible bundles that can break WASM initialization
  // on Vercel Edge ("Wasm code generation disallowed by embedder").
  ignore: ["**/src/pages/api/og.tsx"],
};
