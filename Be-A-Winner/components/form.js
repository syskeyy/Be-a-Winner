import Link from "next/link";

// This is the form component that will be used for both the login and signup pages
const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Username</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="rpassword" required />
      </label>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup" legacyBehavior>
            <a className="noAccount">I don't have an account</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href="/login" legacyBehavior>
            <a className="noAccount">I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: none;
        border-radius: 4px;
        background-color: rgb(169, 57, 255);
        color: white;
      }
      .submit > button:hover {
        color: rgb(169, 57, 255);
        background-color: white;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
      .noAccount {
        color: white;
      }
      .noAccount:hover {
        color: #ccc;
      }
    `}</style>
  </form>
);

export default Form;
