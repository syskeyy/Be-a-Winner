import Head from "next/head";
import Header from "./header";

const Layout = (props) => (
  <>
    <Head>
      <title>Be a winner!</title>
    </Head>

    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>
  </>
);

export default Layout;