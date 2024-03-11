import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/raffle.module.css";
import { usePrizes } from "../lib/hookPrize";
import { useState } from 'react';
// using toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// use prizes to show prizes, use user to use user data
// added email states to handle the email input
const Raffle = () => {
  const { prizes, isLoading, isError } = usePrizes();
  const [email, setEmail] = useState('');
  const user = useUser();

  // handles the form submission and adds a new raffle prize, it will grab the id of raffle to body and send it to the server
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
      toast.info("You have entered the raffle successfully! 🎉🎉🎉");
      const data = await response.json();
      console.log('Raffle entered successfully:', data);
    } catch (error) {
      console.error('An error occurred while entering the raffle:', error);
    }
  };

  // handles the form submission and adds a new raffle prize, it will grab email, and raffle id to body and send it to the server of users with no login
  // theres also a check to see if email is blank, if it is, it wont work
  const enterRaffleNoLogin = async (id, email) => {
    if (!email) {
      console.log('Email is required to enter the raffle');
      return;
    }

    try {
      const response = await fetch('/api/addRaffleNoLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, email }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while entering the raffle');
      }

      toast.info("You have entered the raffle successfully! 🎉🎉🎉");
      const data = await response.json();
      console.log('Raffle entered successfully:', data);
    } catch (error) {
      console.error('An error occurred while entering the raffle:', error);
    }
  };

  // handles the form submission of draw winner, it will grab the raffle id to body and send it to the server
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
      toast.info("Winner has been drawn!");
      const data = await response.json();
      console.log('Winner entered successfully:', data);
    } catch (error) {
      console.error('An error occurred while entering winner:', error);
    }
  };
  // handles the form submission of delete entry, it will grab the raffle id to body and send it to the server
  const deleteEntry = async (id) => {
    try {
      const response = await fetch('/api/deleteEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while deleting entry');
      }

      toast.info("Entries have been deleted! ");
      const data = await response.json();
      console.log('Entry successfully deleted:', data);
    } catch (error) {
      console.error('An error occurred while deleting entry:', error);
    }
  };
  // If user is logged in, it will show not show email box, otherwise it will show the email box for users with no login to enter the raffle, if email is submitted blank, it wont work 
  return (
    <Layout>
      <ToastContainer />

          {user ? (
            <>            
          <h1>🎫Enter the raffles!🎫</h1>
          <form className={styles.prizeForm}>
            <table className={styles.prizesTable}>
            <thead>
              <tr className={styles.prizesHeader}>
                <th>Raffle Name</th>
                <th>Description</th>
                <th>Winner Id</th>
              </tr>
            </thead>
            <tbody className={styles.prizesBody}>
              {prizes && prizes.map((prize) => (
                <tr key={prize.id} className={styles.prizesrow}>
                  <td>{prize.raffleName}</td>
                  <td>{prize.prizeDescription}</td>
                  <td>{prize.winnerId}</td>
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => enterRaffle(prize.id)}>Enter Raffle</button>                    
                    <button type="button" className={`${styles.submit} ${styles.drawWinner}`} onClick={() => drawWinner(prize.id)}>Draw Winner</button>
                    <button type="button" className={`${styles.submit} ${styles.deleteEntry}`} onClick={() => deleteEntry(prize.id)}>Remove Entries</button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          </form>
          </>
          ) : (
            <>
          <h1>🎫Enter the raffles!🎫</h1>
             <form className={styles.prizeForm}>
                <div className={styles.prizeEmails}>
                  <label htmlFor="name">*Enter E-mail* before submitting!</label>
                  <input type="email" id="email" name="email" placeholder="john@gmail.com" required onChange={e => setEmail(e.target.value)}/>
                </div>
            <table className={styles.prizesTable}>
            <thead>
              <tr className={styles.prizesHeader}>
                <th>Raffle Name</th>
                <th>Description</th>
                <th>Winner Id</th>
              </tr>
            </thead>
            <tbody className={styles.prizesBody}>
              {prizes && prizes.map((prize) => (
                <tr key={prize.id} className={styles.prizesrow}>
                  <td>{prize.raffleName}</td>
                  <td>{prize.prizeDescription}</td>
                  <td>{prize.winnerId}</td>
                  <div className={styles.prizesButtons}>
                    <button type="button" className={`${styles.submit} ${styles.enterRaffle}`} onClick={() => enterRaffleNoLogin(prize.id, email)}>Enter Raffle</button>                    
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