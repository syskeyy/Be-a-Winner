import { useUser } from "../lib/hooks";
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
          <h2>Raffle Grand Prize!</h2>
          <img src="holiday-img.jpg" alt="Raffle Prize Image"/>
          <p>This is a description of the raffle prize. It could be a car, a vacation, or any other exciting prize.</p>
          <h3>Draw Date</h3>
          <p>December 31, 2024.</p>
          <button>Enter Raffle</button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
