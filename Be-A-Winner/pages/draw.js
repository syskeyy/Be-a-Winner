import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/raffle.module.css";
const Raffle = () => {
  const user = useUser();

  return (
    <Layout>
    <form className={styles.raffleForm}>
      <h2>Enter the Raffle!</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <button type="submit" className={styles.submit}>Enter Raffle</button>
    </form>
    </Layout>
  );
};

export default Raffle;
