import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import { usePrizes } from "../lib/hookPrize";
import { useLuckyWinner } from "../lib/hookLuckyNumber";

import styles from "../styles/profile.module.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });
  const { prizes } = usePrizes();
  const { luckyNumbers } = useLuckyWinner();

  const claimPrize = async (id) => {
    try {
      const response = await fetch('/api/claimPrize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while claiming the prize');
      }

      const data = await response.json();
      console.log('Claimed successfully:', data);
      toast.info("You have claimed the prize successfully! 🎉");
    } catch (error) {
      console.error('An error occurred while claiming the prize:', error);
    }
  };

  const claimLucky = async (id) => {
    try {
      const response = await fetch('/api/claimLuckyNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while claiming the prize');
      }

      const data = await response.json();
      console.log('Claimed successfully:', data);
      toast.info("You have claimed the lucky number! 🍀");
    } catch (error) {
      console.error('An error occurred while claiming the prize:', error);
    }
  };
  return (
    <Layout>
    <ToastContainer />
      <h1>😀Profile😀</h1>
      {user && (
        <>
          <h2>Profile session</h2>
          <div className={styles.container}>
            <table className={styles.profileSession}>
              <tbody>
                {Object.entries(user).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>🏆Raffle Winnings!🏆</h2>
            <table className={styles.prizesTable}>
            <thead>
              <tr className={styles.prizesHeader}>
                <th>Raffle Name</th>
                <th>Description</th>
                <th>Winner (you)</th>
                <th>Claimed</th>
              </tr>
            </thead>
            <tbody className={styles.prizesBody}>
            {prizes && prizes
              .filter(prize => prize.winnerId === user.id)
              .map((prize) => (
                <tr key={prize.id} className={styles.prizesrow}>
                  <td>{prize.raffleName}</td>
                  <td>{prize.prizeDescription}</td>
                  <td>{prize.winnerId}</td>
                  <td>{prize.hasClaimed ? "Yes" : "No"}</td>
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => claimPrize(prize.id)}>Claim Prize</button>                    
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <h2>🍀Lucky Numbers Winnings!🍀</h2>
            <table className={styles.prizesTable}>
            <thead>
              <tr className={styles.prizesHeader}>
                <th>Lucky number</th>
                <th>Winner (you)</th>
                <th>Claimed</th>
              </tr>
            </thead>
            <tbody className={styles.prizesBody}>
            {luckyNumbers && luckyNumbers
              .filter(luckyNumbers => luckyNumbers.winnerId === user.id)
              .map((luckyNumbers) => (
                <tr key={luckyNumbers.id} className={styles.prizesrow}>
                  <td>{luckyNumbers.luckyNumber}</td>
                  <td>{luckyNumbers.winnerId}</td>
                  <td>{luckyNumbers.hasClaimed ? "Yes" : "No"}</td>
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => claimLucky(luckyNumbers.id)}>Claim Prize</button>                    
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;
