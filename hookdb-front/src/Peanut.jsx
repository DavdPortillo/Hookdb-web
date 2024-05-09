import { useContext, useState } from "react";

import { Authentication } from "./modals/components"
import { Footer, HeaderGuest, HeaderUser } from './pages/mainPage/components';
import { Toaster } from 'react-hot-toast';

import { PeanutRoutes } from "./pages/routes/PeanutRoutes";
import { AdminPanelPage } from "./pages/adminPanelPage/AdminPanelPage";
import { UserContext } from "./context/UserContext";

export const Peanut = () => {

    const [showAuthentication, setShowAuthentication] = useState(false);
    const { user, token, userLoaded } = useContext(UserContext);
    const onClickAuth = () => {
        setShowAuthentication(!showAuthentication);
    };


    const isAdmin = user && user.role === "1";


    return (
        userLoaded !== null &&
        <>
            <Toaster toastOptions={{
                style: {
                    backgroundColor: 'rgb(3, 7, 18)',
                    color: '#fff',
                    border: '1px solid white',
                    fontSize: '14px'
                }
            }} />
            {isAdmin ? <AdminPanelPage /> : (
                <div className="container">
                    {token ? <HeaderUser /> : <HeaderGuest onClickAuth={onClickAuth} />}

                    {
                        (showAuthentication) && <Authentication onClickAuth={onClickAuth} />
                    }

                    <PeanutRoutes />

                    <Footer />
                </div>


            )}

        </>








    )
}
