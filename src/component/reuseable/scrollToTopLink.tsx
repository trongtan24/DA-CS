import { Link, type LinkProps } from 'react-router-dom';
import { type ReactNode, useRef } from 'react';

interface ScrollToTopLinkProps extends LinkProps {
  children: ReactNode;
}

export default function ScrollToTopLink({ children, ...props }: ScrollToTopLinkProps) {
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200); 
  };

  return (
    <Link
      {...props}
      onClick={(e) => {
        handleClick();
        props.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}