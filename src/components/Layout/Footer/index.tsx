import Link from 'next/link';

function Footer() {
  return (
    <footer>
      <p>
        Made with ❤️ by{' '}
        <Link href="https://tmserl.com">
          <span className="underline">Tom Earl</span>
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
