import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/raffle.module.css";
import { usePrizes } from "../lib/hookPrize";

const Raffle = () => {
  const { prizes, isLoading, isError } = usePrizes();
  console.log('Prizes in Component:', prizes); 
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
            <form className={styles.prizeForm}>
              <table className={styles.prizesTable}>
              <thead>
                <tr className={styles.prizesHeader}>
                  <th>Raffle Name</th>
                  <th>Description</th>
                  <th>Maximum Entries</th>
                </tr>
              </thead>
              <tbody className={styles.prizesBody}>
                {prizes && prizes.map((prize) => (
                  <tr key={prize.id} className={styles.prizesrow}>
                    <td>{prize.raffleName}</td>
                    <td>{prize.prizeDescription}</td>
                    <td>{prize.maximumEntries}</td>
                    <button type="submit" className={styles.submit}>Enter Raffle</button>
                  </tr>
                ))}
              </tbody>
            </table>
            </form>
            </>
          )}
    </Layout>
  );
};

export default Raffle;
