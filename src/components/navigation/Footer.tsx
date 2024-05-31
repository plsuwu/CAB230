import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

const Footer: React.FC = (): React.ReactElement => {
	return (
		<div className='flex flex-col items-end justify-center space-x-1 bg-vol-mantle py-4 px-8 shadow-inner shadow-black/35'>
			<div>
				This website uses data from the Smithsonian Institution's Global Volcanism Program database.
			</div>
			<Link
				to='https://volcano.si.edu/gvp_about.cfm'
				className='flex flex-row items-center space-x-1 font-medium text-vol-white transition-opacity duration-200 ease-out hover:opacity-55'
				target='_blank'
			>
				<div>Click here to learn more</div>
				<FiExternalLink />
			</Link>
		</div>
	);
};

export default Footer;
