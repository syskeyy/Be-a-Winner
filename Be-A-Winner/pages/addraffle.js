import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/addraffle.module.css";

// handles the form submission and adds a new raffle prize, it will grab the rafflename and description to body and send it to the server
// I reused some of the code from the login.js file
const AddRaffle = () => {
    const user = useUser({ redirectTo: "/login", redirectIfFound: false });
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
      const body = {
        raffleName: e.currentTarget.raffleName.value,
        prizeDescription: e.currentTarget.prizeDescription.value,
      };
  
      try {
        const res = await fetch("/api/prize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          Router.push("/");
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
      }
    }

    // if user is logged in, they can submit a raffle prize, otherwise they will be prompted to login
  return (
    <Layout>
    {user ? (
            <>
             <form className={styles.raffleForm} onSubmit={handleSubmit}>
                <h2>Add Raffle Prize!</h2>
                <label htmlFor="name">Raffle Name</label>
                <input type="text" id="raffleName" name="name" required />

                <label htmlFor="name">Prize Description</label>
                <textarea  type="text" id="prizeDescription" name="name" required />

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

export default AddRaffle;
