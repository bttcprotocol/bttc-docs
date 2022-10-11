// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bittorrent-Chain Docs',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/bittorrent-logo.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'zh-hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/bttcprotocol/bttc-docs/tree/master',
          path: "docs",
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        title: 'Bittorrent-Chain Docs',
        logo: {
          alt: 'Logo',
          src: 'img/bittorrent-logo.png',
          target: "_self",
        },
        items: [
         {
            label: "Apps",
            position: "right",
            items: [
                  {
                    href: 'https://bt.io/wallet/?language=EN',
                    label: 'Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://bt.io/bridge?language=EN',
                    label: 'Bridge',
                    target: '_blank',
                    rel: null,
                  },
		  {
                    href: 'https://bt.io/staking?language=EN',
                    label: 'Staking',
                    target: '_blank',
                    rel: null,
                  },
		  {
                    href: 'https://bt.io/bttcswap?language=EN',
                    label: 'Swap',
                    target: '_blank',
                    rel: null,
                  },
		  {
                    href: 'https://bttcscan.com/',
                    label: 'Explorer',
                    target: '_blank',
                    rel: null,
                  },
		  {
                    href: 'https://scan.bt.io',
                    label: 'BTTCSCAN',
                    target: '_blank',
                    rel: null,
                  },
		  {
                    href: 'https://bt.io/swap/?language=EN',
                    label: 'BTT Redenomination',
                    target: '_blank',
                    rel: null,
                  },

		],
	  },
          {
		  label: "Community",
		  position: "right",
		  items: [
			  {
			    href: 'https://discord.com/invite/qrxfbgQYGa',
			    label: 'Discord',
			    target: '_blank',
			    rel: null,
			  },
			  {
			    href: 'https://twitter.com/BitTorrent',
			    label: 'Twitter',
			    target: '_blank',
			    rel: null,
			  },
			  {
			    href: 'https://t.me/BitTorrentChain',
			    label: 'Telegram',
			    target: '_blank',
			    rel: null,
			  },
			  {
			    href: 'https://medium.com/@BitTorrent',
			    label: 'Medium',
			    target: '_blank',
			    rel: null,
			  },

		  ],
	  },
          {
		  label: "Security Audit",
		  position: "right",
		  items: [
			  {
			    href: 'https://official.bt.io/doc/SlowMist%20Audit%20Report%20-%20BitTorrent%20-%20TRON.pdf',
			    label: 'Bittorrent TRON',
			    target: '_blank',
			    rel: null,
			  },
			  {
			    href: 'https://official.bt.io/doc/SlowMist%20Audit%20Report%20-%20BitTorrent%20-%20Ethereum.pdf',
			    label: 'Bittorrent Ethereum',
			    target: '_blank',
			    rel: null,
			  },

		  ],
	  },
          {
             to: "docs/contribute/guidelines",
             label: "Contribute to the Docs",
             position: "right",
             //activeBasePath: "docs/contribute",
          },
	  {
	     href: "https://github.com/bttcprotocol",
	     position: "right",
             className: "header-github-link",
             "aria-label": "GitHub repository",
          },

	  {
             type: 'localeDropdown',
             position: 'right',
          },
        ],
      },
      algolia: {
        indexName: "bttc_developer",
        appId: '1QBPKMZ7KH',
        apiKey: "257d6b7627b4435cd2f99fd23e6ab5d6",
        contextualSearch: false,
        algoliaOptions: {},

      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Apps',
            items: [
              {
                label: 'Wallet',
                to: 'https://bt.io/wallet/?language=EN',
              },
	      {
                label: 'Bridge',
                to: 'https://bt.io/bridge?language=EN',
              },
	      {
                label: 'Staking',
                to: 'https://bt.io/staking?language=EN',
              },
	      {
                label: 'Swap',
                to: 'https://bt.io/bttcswap?language=EN',
              },
	      {
                label: 'Explorer',
                to: 'https://bttcscan.com/',
              },
	      {
                label: 'BTTCSCAN',
                to: 'https://scan.bt.io',
              },
               {
                label: 'BTT Redenomination',
     		to: 'https://bt.io/swap/?language=EN',
              },


            ],
          },
          {
            title: 'DevCenter',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/bttcprotocol',
              },
              {
                label: 'Faucet',
                href: 'https://testfaucet.bt.io/',
              },
              {
                label: 'Testnet',
                href: 'https://test.bt.io',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
		href: 'https://discord.com/invite/qrxfbgQYGa',
              },
              {
                label: 'Twitter',
		href: 'https://twitter.com/BitTorrent',
              },
              {
                label: 'Telegram',
		href: 'https://t.me/BitTorrentChain',
              },
              {
                label: 'Meidum',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bittorrent-Chain | All rights reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
module.exports = config;
