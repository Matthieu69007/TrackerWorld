// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trace across the world',
  tagline: 'Le tour du monde depuis chez soi !',
  favicon: 'img/Mascotte/Resize/lamatetedetoure.ico',

  // Set the production url of your site here
  url: 'https://traceacrosstheworld.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TraceAcrossTheWorld', // Usually your GitHub org/user name.
  projectName: 'TraceAcrossTheWorld', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr','en','de','cs','es','hu','pl','pt'],
  },
  
  plugins: [],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          
        },
        
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve("leaflet/dist/leaflet.css"),
            require.resolve("./src/Components/Map/Leaflet.Dialog.css"),
            require.resolve("./src/css/fontawesome-free-6.4.2-web/css/all.css"),
          ]
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img//Mascotte/TraceSocialCard.jpg',
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Home Logo',
          src: 'img/Mascotte/Resize/lamatetedetoure.svg',
        },
        items: [
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://www.instagram.com/traceacrosstheworld/',
            label: 'Instagram',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: 'Community',
            items: [
              {
                label: 'What\'s App',
                href: 'https://chat.whatsapp.com/FKwW0q23yVk3OdKNKAxGnE',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/traceacrosstheworld/',
              },
            ],
          },
          //{
          //  title: 'More',
          //  items: [
          //    {
          //      label: 'Blog',
          //      to: '/blog',
         //     },
         //   ],
         // },
        ],
        copyright: `Copyright © 2023- TraceAcrossTheWorld.com. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
