import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import styles from "../styles/addraffle.module.css";

const AddRaffle = () => {
    const user = useUser({ redirectTo: "/login", redirectIfFound: false });
    const [errorMsg, setErrorMsg] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault();
  
      if (errorMsg) setErrorMsg("");
  
      const body = {
        raffleName: e.currentTarget.raffleName.value,
        prizeDescription: e.currentTarget.prizeDescription.value,
        maximumEntries: e.currentTarget.maximumEntries.value,
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
        setErrorMsg(error.message);
      }
    }

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

                <label htmlFor="name">Maximum Entries</label>
                <input type="number" id="maximumEntries" name="name" required />

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
