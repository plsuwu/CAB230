import { Link } from 'react-router-dom';

interface ImageButtonProps {
	image: string;
	href: string;
    content: string[]
}

const ImageButton: React.FC<ImageButtonProps> = ({ image, href, content }): React.ReactElement => {
	return (
		<Link to={href}>
			<div className='flex flex-col items-center justify-center space-y-6 group'>
				<img src={image} className='rounded-md shadow-xl hover:scale-110 transition-all duration-500 ease-out' />
				<span className='text-center text-sm '>
                Pictured above:
				<span className='text-lg text-vol-fawn group-hover:text-vol-white/55 transition-all duration-300 ease-out'>
						&nbsp;'{content[0]}',&nbsp;
					</span>{' '}
					in {content[1]}
				</span>
			</div>
		</Link>
	);
};

export default ImageButton;
