export const deviceSizes = {
  start: 1360,
  laptop: 1024,
  tablet: 768,
  mobile: 420
};

const device = {
  start: `screen and (max-width: ${deviceSizes.start}px)`,
  laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
  tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
  mobile: `screen and (max-width: ${deviceSizes.mobile}px)`
};

export const theme = {
  device
};

export default theme;
