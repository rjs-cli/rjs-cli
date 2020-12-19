export const createIndexStyleTemplate = ({ useSass }: { useSass: boolean }) =>
`${useSass ? `@import './reset';
@import './variables';` : ''}

html {
  background-color: #222;
}`
