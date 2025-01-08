import { Link } from 'react-router-dom';
import logo from '../../assets/the-guide-logo-mid-white.webp';
import { FaFacebook, FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {

    const footerNav = (
        <>
          <li>
            <Link to="/" className='hover:text-accent'>
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-blog" className='hover:text-accent'>
              Add Blog
            </Link>
          </li>
          <li>
            <Link to="/all-blogs" className='hover:text-accent'>
              All Blogs
            </Link>
          </li>
          <li>
            <Link to="/featured-blogs" className='hover:text-accent'>
              Featured Blogs
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className='hover:text-accent'>
              Wishlist
            </Link>
          </li>
        </>
      );

    return (
        <div className="bg-dark">
            <div className="max-w-screen-2xl mx-auto px-4 py-8">
                <div className="grid xs:grid-cols-3 gap-8 text-white py-8">
                    <div className='col-span-2 grid gap-8'>
                        <Link to="/"><img className="max-w-32 md:max-w-40" src={logo} alt="" /></Link>
                        <p>Our goal is to provide the readers with an enhanced experience through fast updates, quality content and a proven customer service.</p>
                        <div className='flex items-center gap-4'>
                            <Link to="https://www.facebook.com" className='hover:text-accent transition'><FaFacebook/></Link>
                            <Link to="https://www.instagram.com" className='hover:text-accent transition'><FaInstagram/></Link>
                            <Link to="https://www.x.com" className='hover:text-accent transition'><FaXTwitter/></Link>
                            <Link to="https://web.telegram.org" className='hover:text-accent transition'><FaTelegram/></Link>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <ul className='grid items-center justify-center md:justify-end gap-4 text-sm'>
                            {footerNav}
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center px-4 py-8 text-white text-sm">
                <p>&#169; TheGuide 2024 All Rights Reserved</p>
                <p className='flex items-center gap-1'>Made by <Link to="https://github.com/itihash-oboshonno" className='flex items-center gap-1 hover:text-accent transition'>Ahmed Abrar Ariyan <FaGithub/></Link></p>
            </div>
        </div>
    );
};

export default Footer;