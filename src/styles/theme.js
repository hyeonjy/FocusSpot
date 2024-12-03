const deviceSizes = {
  start: '1360px',
  laptop: '1024px',
  tablet: '768px',
  mobile: '375px'
};

const device = {
  start: `screen and (max-width: ${deviceSizes.start})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  mobile: `screen and (max-width: ${deviceSizes.mobile})`
};

const theme = {
  device
};

export default theme;
