import { PAGES } from "@/config/pages.config";

export interface IMenuItem {
    href: string;
    name: string;
}
export const MENU: IMenuItem[] = [
    {
        href: PAGES.HOME,
        name: 'Главная'
    },
    {
        href: PAGES.CATALOG,
        name: 'Каталог'
    },
];