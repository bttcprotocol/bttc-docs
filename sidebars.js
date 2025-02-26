/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'quickstart',
      label: 'Quick Start',
    },
    {
        type: 'category',
        label: 'Tutorial',
        collapsible: true,
        collapsed: true,
        items: [
          {
            type: 'doc',
              id: 'tutorial/build-web3-app',
            label: 'Build a Web3 App On BTTC',
          },
          {
            type: 'doc',
              id: 'tutorial/quick-migration-guide-for-ethereum-dApp',
            label: 'Quick Migration Guide for Ethereum DApp',
          },
        ],
    },
    {
      type: 'doc',
      id: 'wallet',
      label: 'Wallet',
    },
    {
      type: 'category',
      label: 'Network',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'networks/network',
          label: 'Network Details',
        },
	{
          type: 'link',
          label: 'Faucet',
	  href: "https://testfaucet.bt.io"
        },
	{
          type: 'link',
          label: 'JSON-RPC',
	  href: "https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest"
        },

      ],
    },
    {
      type: "category",
      label: "Assets",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Tokens",
          link: {
            type: "generated-index",
          },
          items: [
            "assets/tokens/gastoken-btt",
            "assets/tokens/mappedtokens",
          ],
        },
	{
          type: "category",
          label: "NFTs",
          link: {
            type: "generated-index",
          },
          items: [
            "assets/nfts/BTTC-NFT-Tutorial",
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'smartcontract/deploy-contracts',
          label: 'Deploy Contract',
        },
        {
          type: 'doc',
      	  id: 'smartcontract/genesis-contracts',
          label: 'Genesis Contracts',
        },
      ],
    },
    {
      type: 'category',
      label: 'Node',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'node/build-fullnode',
          label: 'Fullnode Deployment',
        },
        {
          type: 'doc',
      	  id: 'node/snapshot',
          label: 'Snapshot',
        },
      ],
    },
    {
      type: 'category',
      label: 'Bridge',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'bridge/overview',
          label: 'Overview',
        },
        {
          type: 'doc',
      	  id: 'bridge/assets-mapping',
          label: 'Assets Mapping',
        },
        {
          type: 'doc',
      	  id: 'bridge/deposit-and-withdraw',
          label: 'Deposit and Withdraw',
        },
	{
          type: 'category',
          label: "Relayer",
          link: {
            type: "generated-index",
          },
          items: [
            "bridge/relayer/relayer",
            "bridge/relayer/relayerdeploy",
            "bridge/relayer/relayerguide",
            "bridge/relayer/relayerdeposit",
            "bridge/relayer/relayerreservegasfee",
            "bridge/relayer/relayermodifyinfo",
            "bridge/relayer/relayerwithdraw",
          ],
        },
        {
          type: 'doc',
      	  id: 'bridge/deposit-checkpoint-event-tracking',
          label: 'Deposit Checkpoint Event Tracking',
        },
        {
          type: 'doc',
      	  id: 'bridge/cross-chain',
          label: 'Cross-Chain',
        },
      ],
    },
    {
      type: 'category',
      label: 'Oracles',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'oracles/getting-started',
          label: 'Getting Started',
        },
      ],
    },
    {
      type: 'category',
      label: 'Storage',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'storage/btfs',
          label: 'BTFS',
        },
        {
          type: 'doc',
          id: 'storage/ipfs',
          label: 'IPFS',
        },
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'faq/general-faq',
          label: 'General FAQ',
        },
        {
          type: 'doc',
          id: 'faq/technical-faq',
          label: 'Technical FAQ',
        },
      ],
    },    

    

  ],
  validatorSidebar: [
    {
      type: 'doc',
      id: 'validator/getting-started',
      label: 'Validator Overview',
    },
    {
      type: 'doc',
      id: 'validator/responsibilities',
      label: 'Responsibilities',
    },
    {
      type: 'doc',
      id: 'validator/staking',
      label: 'Staking',
    },
    {
      type: 'doc',
      id: 'validator/rewards',
      label: 'Rewards',
    },
    {
      type: 'category',
      label: 'Core Components',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'validator/core-components/delivery-layer',
          label: 'Delivery Layer',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/bttc-layer',
          label: 'Bttc Layer',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/checkpoint',
          label: 'Checkpoints',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/key-management',
          label: 'Key Management',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/proposer-producer-selection',
          label: 'Proposers & Producers',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/proposer-bonus',
          label: 'Proposer Bonus',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/transaction-fees',
          label: 'Transaction Fees',
        },
        {
          type: 'doc',
      	  id: 'validator/core-components/state-sync-mechanism',
          label: 'State Sync Mechanism',
        },
      ],
    },
    {
      type: 'category',
      label: 'Node Management',
      collapsible: true,
      collapsed: true,
      items: [
        {
	  type: 'doc',
	  id: 'validator/build-validator-node',
	  label: 'Validator Node Deployment',
        },
        {
	  type: 'doc',
      	  id: 'node/snapshot',
	  label: 'Snapshot',
        },
        {
          type: 'doc',
      	  id: 'validator/port_management',
          label: 'Port Management',
        },
      ],
    },
    {
      type: 'category',
      label: 'Staking Operations',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'validator/validator-commission-operations',
          label: 'Commission Operations',
        },
      ],
    },

    {
      type: 'doc',
      id: 'validator/glossary',
      label: 'Glossary',
    },
    {
      type: 'category',
      label: 'FAQ',
      collapsible: true,
      collapsed: true,
      items: [
        { 
          type: 'doc',
          id: 'faq/validator-faq',
          label: 'Validator FAQ',
        },
        { 
          type: 'doc',
          id: 'faq/staking-faq',
          label: 'Staking FAQ',
        },
      ],
    },    

 ],
  delegator: [
    {
      type: 'doc',
      id: 'delegator/how-to-delegate',
      label: 'How to Delegate',
    },
    {
      type: 'doc',
      id: 'delegator/contract',
      label: 'Contract',
    },
    {
      type: 'doc',
      id: 'faq/delegate-faq',
      label: 'Delegator FAQ',
    },

 ],

  faqSidebar: [
        {
          type: 'doc',
          id: 'faq/general-faq',
          label: 'General FAQ',
        },
        {
          type: 'doc',
          id: 'faq/technical-faq',
          label: 'Technical FAQ',
        },
        {
          type: 'doc',
          id: 'faq/delegate-faq',
          label: 'Delegator FAQ',
        },
        {
          type: 'doc',
          id: 'faq/validator-faq',
          label: 'Validator FAQ',
        },
        {
          type: 'doc',
          id: 'faq/staking-faq',
          label: 'Staking FAQ',
        },
 ],


 governanceSidebar: [
    {
      type: 'doc',
      id: 'governance/govern',
      label: 'Governance',
    },
 ],
 contribute: [
    {
      type: 'doc',
      id: 'contribute/guidelines',
      label: 'Contributor Guidelines',
    },
 ],
 architecture: [
    {
      type: 'doc',
      id: 'architecture/arch',
      label: 'Architecture',
    },
 ],
 basics: [
    {
      type: 'category',
      label: 'BlockChain Basics',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-blockchain',
          label: 'BlockChain',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-blockchain-types',
          label: 'Types of Blockchain',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-consensus-mechanism',
          label: 'Consensus',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-ethereum',
          label: 'Ethereum',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-solidity',
          label: 'Solidity',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-accounts',
          label: 'Accounts',
        },
        {
          type: 'doc',
      	  id: 'basics/blockchain-basics/basics-gas',
          label: 'Gas',
        },
      ],
    },
    {
      type: 'category',
      label: 'BTTC Basics',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
      	  id: 'basics/bttc-basics/what-is-bttc',
          label: 'What is BTTC?',
        },
        {
          type: 'doc',
      	  id: 'basics/bttc-basics/what-is-proof-of-stake',
          label: 'What is Proof of Stake?',
        },
        {
          type: 'doc',
      	  id: 'basics/bttc-basics/who-is-a-delegator',
          label: 'Who is Delegator?',
        },
        {
          type: 'doc',
      	  id: 'basics/bttc-basics/who-is-a-validator',
          label: 'Who is Validator?',
        },
        {
          type: 'doc',
      	  id: 'basics/bttc-basics/bttc-pos-architecture',
          label: 'BTTC PoS Architecture',
        },
      ],
     },
 ],

};

module.exports = sidebars;
