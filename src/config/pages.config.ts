export const PAGES = {
    HOME: "/",
    CATALOG: "/catalog",
    CART: "/cart",
    MATCHER: "/matcher",
    ABOUT: "/about",
    AUTH:"/auth",
    FAVORITES: "/favorites",
    LIKES : "/likes",
    USERPROFILE: "/userprofile",

    getProduct: (id: string) => `/catalog/${id}`,
    getCatalog: (sort?: string) => sort ? `/catalog?sort=${sort}` : "/catalog",
};