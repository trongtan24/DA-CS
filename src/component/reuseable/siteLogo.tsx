import logo from '/src/assets/B8K.png'
import { Link } from 'react-router-dom';

function siteLogo() {
  return (
    <Link to="/" className='flex gap-2 items-center'>
        <img src={logo} alt="Logo" className="h-12 w-auto max-w-[120px] object-contain" />
        <div className='font-bold md:flex text-nowrap hidden-320'>Book Store</div>
    </Link>
  );
}

export default siteLogo;