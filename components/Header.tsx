import { SFC } from 'react';
import Link from 'next/link';


const Header: SFC = () => (
  <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  </header>
);

export default Header;
