import { Link } from 'react-router-dom';
import errorImg from '../../assets/404-error.png'

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-10'>
            <img className='max-h-52 mx-auto p-5' src={errorImg} alt="" />
            <p className='text-center font-bold'>Something went wrong... Page not found!</p>
            <Link to='/'><button className="text-dark font-bold px-6 py-3 rounded-full bg-prim3 cursor-pointer hover:shadow-lg">Go to Homepage</button></Link>
        </div>
    );
};

export default ErrorPage;