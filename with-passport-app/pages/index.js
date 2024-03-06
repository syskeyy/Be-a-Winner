import { useUser } from "../lib/hooks";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/index.module.css";
const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>🎉 BE A WINNER! 🎉</h1>
      <p>Be a winner today by entering in the raffle and win awesome prizes! </p>
      <div className={styles.indexContainer}>
        <div className={styles.raffleDetails}>
          <h2>🏖️Ultimate Grand Prize!🏖️</h2>
          <img src="holiday-img.jpg" alt="Raffle Prize Image"/>
          <p>Win an all-inclusive free trip to Gran Canaria by entering in the raffle!</p>
          <p>Draw Date: </p>
          <h3>December 31, 2024.</h3>
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
