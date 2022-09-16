import {
    CONTACTS_ROUTE,
    HOME_ROUTE
} from "../utils/consts";
import {HomePage} from "../pages/HomePage";
import {ContactsPage} from "../pages/ContactsPage";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    }
]

export const privateRoutes = [
    {
        path: CONTACTS_ROUTE,
        Component: <ContactsPage/>
    },
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    }
]