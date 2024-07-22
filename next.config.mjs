/** @type {import('next').NextConfig} */
import _ from 'lodash-es';
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    // antd & deps
    "@ant-design",
    "@rc-component",
    "@ant-design/plots",
    "@ant-design/charts",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  webpack(config) {
    // Example of using `path` with `import`
    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash-es': path.resolve( './node_modules/lodash-es')
    };

    return config;
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en'
  },
  experimental: { esmExternals: 'loose' }
};

export default nextConfig;
