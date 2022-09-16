import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {privateRoutes, publicRoutes} from "./routes";

export const AppRouter = () => {
    const isAuth = useSelector((state:RootState) => state.AuthReducer.isAuth)
    console.log(isAuth)
    // const [user] = useAuthState(auth)
    return isAuth ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component}/>
                )}
                <Route path='*' element={<Navigate to='/home'/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component}/>
                )}
                <Route path='*' element={<Navigate to='/home'/>}/>
            </Routes>
        )
};
