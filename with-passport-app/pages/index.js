import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/index.module.css";
const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>🎉 BE A WINNER! 🎉</h1>
      <p>Be a winner today by entering in the raffle and win awesome prizes! </p>
    </Layout>
  );
};

export default Home;
