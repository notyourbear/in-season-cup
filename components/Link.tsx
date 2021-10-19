import Link from 'next/link';

type Props = {
  direction: string;
  href: string;
};

const LinkButton = ({ direction, href }: Props) => {
  return (
    <Link href={href} passHref>
      <div
        className={`absolute ${direction}-10 bottom-1/4 sm:bottom-1/2 text-4xl hover:text-red-500 cursor-pointer ${
          direction === 'right' ? 'transform rotate-180' : ''
        }`}
        aria-label="link"
      >
        <svg
          className="fill-current"
          aria-hidden="true"
          viewBox="0 0 320 512"
          width="50"
          height="50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M34.52 239.03 228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
        </svg>
      </div>
    </Link>
  );
};

export default LinkButton;
