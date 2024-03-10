import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/raffle.module.css";
import { usePrizes } from "../lib/hookPrize";

const Raffle = () => {
  const { prizes, isLoading, isError } = usePrizes();
  console.log('Prizes in Component:', prizes); 
  const user = useUser();

  const enterRaffle = async (id) => {
    try {
      const response = await fetch('/api/addRaffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while entering the raffle');
      }

      const data = await response.json();
      console.log('Raffle entered successfully:', data);
    } catch (error) {
      console.error('An error occurred while entering the raffle:', error);
    }
  };

  const drawWinner = async (id) => {
    try {
      const response = await fetch('/api/addWinner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while entering the winner');
      }

      const data = await response.json();
      console.log('Winner entered successfully:', data);
    } catch (error) {
      console.error('An error occurred while entering winner:', error);
    }
  };

  return (
    <Layout>
          {user ? (
            <>
          <form className={styles.prizeForm}>
            <h2>Enter the raffles!</h2>
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
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => enterRaffle(prize.id)}>Enter Raffle</button>                    
                    <button type="button" className={`${styles.submit} ${styles.drawWinner}`} onClick={() => drawWinner(prize.id)}>Draw Winner</button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          </form>
          </>
          ) : (
            <>
          <form className={styles.prizeForm}>
                <h2>Enter the raffles!</h2>
                <div className={styles.prizeEmails}>
                  <label htmlFor="name">Enter your email</label>
                  <input type="email" id="email" name="email" required />
                </div>
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
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => enterRaffle(prize.id)}>Enter Raffle</button>                    
                    <button type="button" className={`${styles.submit} ${styles.drawWinner}`} onClick={() => drawWinner(prize.id)}>Draw Winner</button>
                  </div>
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
