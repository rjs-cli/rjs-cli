export const createIndexStyleTemplate = ({ useSass }: { useSass: boolean }) =>
  useSass
    ? `@import './reset';
@import './variables';`
    : '';
