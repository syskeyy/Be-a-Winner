import { useUser } from "../lib/hooks";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/luckynumber.module.css";
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LuckyNumber = () => {
    const [selectedNumber, setSelectedNumber] = useState("");
    let [results, setResults] = useState("");


const DrawResults = (selectedNumber) => {

    console.log("Selected Number: ", selectedNumber);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log("Random Number: ", randomNumber);

    if (selectedNumber == randomNumber) {
        setResults("You win! 🎉");
        toast.info("You win! 🎉");

    } else {
        setResults("You lose! 😢");
        toast.info("You lose! 😢");
    }
}
  return (
    <Layout>
        <ToastContainer />
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>🍀Lucky Numbers🍀</h1>
            </div>
            <div className={styles.luckyNumbers}>
                <p>Choose a number between 1 and 10 to win a prize!</p>
                <button value="1" onClick={() => setSelectedNumber("1")} className={styles.numberButton}>1</button>
                <button value="2" onClick={() => setSelectedNumber("2")} className={styles.numberButton}>2</button>
                <button value="3" onClick={() => setSelectedNumber("3")} className={styles.numberButton}>3</button>
                <button value="4" onClick={() => setSelectedNumber("4")} className={styles.numberButton}>4</button>
                <button value="5" onClick={() => setSelectedNumber("5")} className={styles.numberButton}>5</button>
                <button value="6" onClick={() => setSelectedNumber("6")} className={styles.numberButton}>6</button>
                <button value="7" onClick={() => setSelectedNumber("7")} className={styles.numberButton}>7</button>
                <button value="8" onClick={() => setSelectedNumber("8")} className={styles.numberButton}>8</button>
                <button value="9" onClick={() => setSelectedNumber("9")} className={styles.numberButton}>9</button>
                <button value="10" onClick={() => setSelectedNumber("10")} className={styles.numberButton}>10</button>
                <div className={styles.buttons}>
                    <input type="number" value={selectedNumber} className={styles.input} />
                    <input type="submit" value="Submit" onClick={() => DrawResults(selectedNumber)} className={styles.submitButton} />
                </div>
                <div className={styles.results}>
                    <h1>Results: </h1>
                    <h2>{results} </h2>
            </div>
            </div>

        </div>
    </Layout>
  );
};

export default LuckyNumber;
