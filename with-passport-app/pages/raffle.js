import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/raffle.module.css";
import { usePrizes } from "../lib/hookPrize";

const Raffle = () => {
  const prizes = usePrizes();
  const user = useUser();

  return (
    <Layout>
    {user ? (
            <>
              <form className={styles.raffleForm}>
                <h2>Enter the Raffle!</h2>
                <button type="submit" className={styles.submit}>Enter Raffle</button>
            </form>
            </>
          ) : (
            <>
              <form className={styles.raffleForm}>
                <h2>Enter the Raffle!</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <button type="submit" className={styles.submit}>Enter Raffle</button>
            </form>
            {prizes.map((prize) => (
              <div key={prize.id}>{prize.name}</div>
             ))}
            </>
          )}
    </Layout>
  );
};

export default Raffle;