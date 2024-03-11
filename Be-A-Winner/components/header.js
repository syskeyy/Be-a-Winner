import Link from "next/link";
import { useUser } from "../lib/hooks";

const Header = () => {
  const user = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/profile" legacyBehavior>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/raffle" legacyBehavior>
                  <a>Raffles</a>
                </Link>
              </li>
              <li>
                <Link href="/addraffle" legacyBehavior>
                  <a>Add Prizes</a>
                </Link>
              </li>
              <li>
                <Link href="/luckynumber" legacyBehavior>
                  <a>Lucky Numbers</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" legacyBehavior>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/raffle" legacyBehavior>
                  <a>Raffles</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1.5rem;
        }
        li:first-child {
          margin-left: auto;
        }
      `}</style>
    </header>
  );
};

export default Header;
