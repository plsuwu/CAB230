import { useMatches } from 'react-router-dom';

const Breadcrumbs: React.FC = (): React.ReactElement => {
	let matches: any = useMatches();
	let crumbs: any = matches
		.filter((match: any) => Boolean(match.handle?.crumb))
		.map((match: any) => match.handle.crumb(match.data));

	return (
		<ol>
			{crumbs.map((crumb: any, index: any) => (
				<li key={index}>{crumb}</li>
			))}
		</ol>
	);
};

export default Breadcrumbs;
