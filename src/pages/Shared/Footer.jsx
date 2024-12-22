import { Link } from 'react-router-dom';
import logo from '../../assets/the-guide-logo-mid-white.webp';
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div className="bg-dark">
            <div className="max-w-screen-2xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8 text-white py-8">
                    <div className='col-span-2 grid gap-8'>
                        <Link to="/"><img className="max-w-32 md:max-w-40" src={logo} alt="" /></Link>
                        <p>Our goal is to provide the readers with an enhanced experience through fast updates, quality content and a proven customer service.</p>
                        <div className='flex items-center gap-4'>
                            <Link to="https://www.facebook.com"><FaFacebook/></Link>
                            <Link to="https://www.instagram.com"><FaInstagram/></Link>
                            <Link to="https://www.x.com"><FaXTwitter/></Link>
                            <Link to="https://web.telegram.org"><FaTelegram/></Link>
                        </div>
                    </div>
                    <div className='col-span-1'>b</div>
                </div>
            </div>
            <hr />
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center px-4 py-8 text-white text-sm">
                <p>&#169; Kypseli 2024 All Rights Reserved</p>
                <p>Made by <Link to="https://github.com/itihash-oboshonno">Ahmed Abrar Ariyan</Link></p>
            </div>
        </div>
    );
};

export default Footer;