import Head from "next/head";
import Header from "./header";

// Layout component, also put a favicon in there
const Layout = (props) => (
  <>
    <Head>
      <title>Be a winner!</title>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>
  </>
);

export default Layout;
