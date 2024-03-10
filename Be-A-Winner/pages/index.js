import { useUser } from "../lib/hooks";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/index.module.css";
const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>🎉 BE A WINNER! 🎉</h1>
      <p>Be a winner today by entering in the raffle to win awesome prizes! </p>
      <div className={styles.indexContainer}>
        <div className={styles.raffleDetails}>
          <h2>🏖️ULTIMATE GRAND PRIZE!🏖️</h2>
          <p>Get the chance to win a free holiday package to Mallorca!:</p>
          <p>Or, try some community submitted prizes by entering in the raffles</p>
          {user ? (
            <Link href="/raffle">
              <button>Enter Raffle</button>
            </Link>
            ) : user === null ? (
              <Link href="/raffle">
                <button>Enter Raffle</button>
              </Link>
            ) : null }
        </div>
      </div>
    </Layout>
  );
};

export default Home;
