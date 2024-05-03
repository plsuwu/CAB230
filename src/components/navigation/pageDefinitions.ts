import { Page } from '@/components/navigation/navbar/NavBar';

export const pageDefinitions: Page[] = [
    { id: 0, name: 'Home', href: '/' },
    { id: 1, name: 'Volcano List', href: '/volcanoes' },
    {
        id: 2,
        name: 'Account',
        href: '/account',
        children: [
            { id: 3, name: 'Login', href: '/account/login' },
            { id: 4, name: 'Register', href: '/account/register' },
        ],
    },
];
