import { Page } from '@/components/navigation/navbar/NavBar';

export const pageDefinitionsLoggedin: Page[] = [
    { id: 0, name: 'Home', href: '/' },
    { id: 1, name: 'Volcano List', href: '/volcanoes' },
    {
        id: 3,
        name: 'Account',
        href: '/account',
        children: [
            { id: 4, name: 'My Account', href: '/account/me' },
            { id: 5, name: 'Logout', href: '/account/logout' },
        ],
    },
];

export const pageDefinitionsLoggedOut: Page[] = [
    { id: 0, name: 'Home', href: '/' },
    { id: 1, name: 'Volcano List', href: '/volcanoes' },
    {
        id: 3,
        name: 'Account',
        href: '/account',
        children: [
            { id: 4, name: 'My Account', href: '/account/me' },
            { id: 5, name: 'Register', href: '/account/register' },
            { id: 6, name: 'Login', href: `/account/login` },
        ],
    },

]
