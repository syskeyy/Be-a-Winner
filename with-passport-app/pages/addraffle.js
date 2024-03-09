import { useUser } from "../lib/hooks";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/addraffle.module.css";
const Home = () => {
  const user = useUser();

  return (
    <Layout>
    {user ? (
            <>
             <form className={styles.raffleForm}>
                <h2>Enter the Raffle!</h2>
                <label htmlFor="name">Raffle Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="name">Prize</label>
                <textarea  type="text" id="name" name="name" required />

                <label htmlFor="name">Maximum Entries</label>
                <input type="number" id="name" name="name" required />

                <button type="submit" className={styles.submit}>Add Prize</button>
            </form>
            </>
          ) : (
            <>
              <form className={styles.raffleForm}>
                <h2>You must login to submit a raffle prize.</h2>
            </form>
            </>
          )}
    </Layout>
  );
};

export default Home;
