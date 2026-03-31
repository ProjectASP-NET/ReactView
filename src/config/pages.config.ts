export const PAGES = {
    HOME: "/",
    CATALOG: "/catalog",
    CART: "/cart",
    MATCHER: "/matcher",
    ABOUT: "/about",

    getProduct: (id: string) => `/catalog/${id}`,
};