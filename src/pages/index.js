import * as React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { firstRow, secondRow, networkBanner } from "../data/features";
/*import SearchBar from '@theme-original/SearchBar';*/

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Translate, {translate} from '@docusaurus/Translate';

function NetworkBanner({title, class_name, description, linkUrl, imageUrl}) {
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className={`banner d-flex ${ class_name }`}>
          <div className="icon-wrapper col-2">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="details col-10">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FirstRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)} activeClassName="active">
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>

  );
}

function SecondRow({ title, status, description, linkUrl, imageUrl }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl(linkUrl)}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl(imageUrl)} alt={title} className="icon" />
          </div>
          <div className="status">{status}</div>
          <div className="title">{title}</div>
          <div className="descriptions">{description}</div>
        </div>
      </Link>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <div
        className="bootstrap-wrapper"
      >
        <br/>
        <h1 align="center" style={{ fontWeight: '650' }}><Translate>Welcome to the Bittorrent-Chain Docs</Translate></h1>


        <div className="container">

<Tabs
defaultValue="beginner"
className="tabs"
values={[
{label: <Translate>Choose a Hub</Translate>, value: 'beginner'},
]}>

<TabItem value="beginner">
<div className="row pt-40">
{networkBanner &&
networkBanner.length &&
networkBanner.map((props, idx) => (
 <NetworkBanner key={idx} {...props} />
))}{" "}
</div>
  <div id="Get Started" className="row">
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/basics/bttc-basics/what-is-bttc")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/basics_2.png")} alt="BTTC Basics" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>BTTC Basics</Translate></div>
          <div className="descriptions"><Translate>Learn about the basics of blockchain and Bitorrent-Chain.</Translate></div>
        </div>
      </Link>
    </div>
    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/architecture/arch")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/arch_2.png")} alt="Architecture" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>Architecture</Translate></div>
          <div className="descriptions"><Translate>A Layer2 proof of stake scaling solution for TRON/Ethereum/BSC and other public blockchains.</Translate></div>
        </div>
      </Link>
    </div>

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/governance/govern")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/governance_2.png")} alt="Governance" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>Governance</Translate></div>
          <div className="descriptions"><Translate>Vote on proposal and participate in the BTTC-DAO</Translate></div>
        </div>
      </Link>
    </div>

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/quickstart")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/developer.png")} alt="Developer" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>Developer</Translate></div>
          <div className="descriptions"><Translate>Build an application and deploy on Bittorrent-Chain.</Translate></div>
        </div>
      </Link>
    </div>

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/delegator/how-to-delegate")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/staking2.png")} alt="Delegator" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>Delegator</Translate></div>
          <div className="descriptions"><Translate>Secure the network by staking BTT and delegating your stake to validators.</Translate></div>
        </div>
      </Link>
    </div>

    <div className="col-md-4 p-8">
      <Link to={useBaseUrl("docs/validator/getting-started")}>
        <div className="show-card">
          <div className="icon-wrapper">
            <img src={useBaseUrl("img/validator.png")} alt="Validator" className="icon" />
          </div>
          <div className="status"></div>
          <div className="title"><Translate>Validator</Translate></div>
          <div className="descriptions"><Translate>Secure the network by staking and operating a node to validate on Bittorrent-Chain.</Translate></div>
        </div>
      </Link>
    </div>


  </div>
<div className="row pt-40">
    {networkBanner &&
      networkBanner.length &&
      networkBanner.map((props, idx) => (
        <NetworkBanner key={idx} {...props} />
      ))}{" "}
  </div>
</TabItem>
</Tabs>
  <br/>
  <br/>
 </div>
</div>
</Layout>
);
}

export default Home;
