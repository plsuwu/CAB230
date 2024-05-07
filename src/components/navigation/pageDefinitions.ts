import { Page } from '@/components/navigation/navbar/NavBar';
import { parseTokenInfo } from '@/lib/utils/token';

const loginOut = () => {
    const token = parseTokenInfo();
    let href = 'Login';

    if (token !== '') {
        href = 'Logout';
    }
    return href;
}

export const pageDefinitions: Page[] = [
    { id: 0, name: 'Home', href: '/' },
    { id: 1, name: 'Volcano List', href: '/volcanoes' },
    {
        id: 2,
        name: 'Account',
        href: '/account',
        children: [
            { id: 5, name: 'My Account', href: '/account/me' },
            { id: 4, name: 'Register', href: '/account/register' },
            { id: 3, name: `${loginOut()}`, href: `/account/${loginOut().toLowerCase()}` },
        ],
    },
];
