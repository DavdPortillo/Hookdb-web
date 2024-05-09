import { useEffect, useState } from "react";

export const useCloseTool = (menuRef) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleClickShow = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

                if(showMenu && !menuRef.current.contains(event.target)){
                    setShowMenu(false);

                }
            
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, showMenu]);

    return { showMenu, handleClickShow };
};
