import logo from '/src/assets/B8K.png'
import { ScrollToTopLink } from '../reuseable';

function siteLogo() {
  return (
    <ScrollToTopLink to="/" className='flex gap-2 items-center justify-center'>
        <img src={logo} alt="Logo" className="h-12 w-auto max-w-[120px] object-contain" />
        <div className={` uppercase font-bold text-xl md:flex text-nowrap hidden-420 transform -translate-y-1/8`}> {/*bg-gradient-to-r from-blue-700 from-25% via-orange-600 via-40% to-blue-700 to-100% bg-clip-text text-transparent*/}
          Đọc để dev
        </div>
    </ScrollToTopLink>
  );
}

export default siteLogo;