import { List } from './List';

import style from '../css/asideLists.module.css';
import generalize from '../../../css/generalize.module.css';
import { CreateList } from '../../../tooltips/CreateList/CreateList';
import { useCloseTool } from '../../../hooks/useCloseTool';
import { useContext, useRef, useState } from 'react';
import { ListSection } from './ListSection';
import { useMediaQuery } from 'react-responsive';
import { UserContext } from '../../../context/UserContext';

export const AsideLists = ({ listData, handleChangeListCollection, handleDeleteList, handleAddNewList, isLoadingList }) => {

    const menuRef = useRef(null);
    const { showMenu, handleClickShow } = useCloseTool(menuRef);
    const isSmallScreen = useMediaQuery({ maxWidth: 992 });
    const [showLists, setShowLists] = useState(false)
    const { language } = useContext(UserContext);
    const listPage = language.listPage;




    const changeshowLists = () => {
        setShowLists(!showLists)
    }

    const renderList = () => {
        if (listData.length > 0) {
            return listData.map(list => (
                <List key={list.id} list={list} handleChangeListCollection={handleChangeListCollection} handleDeleteList={handleDeleteList} />
            ));
        } else {
            return <div className={`${style.messageNoList} `}>{listPage.warnings.noLists}</div>;
        }
    };

    return (
        <aside className={`${style.aside} `}>
            <div className={`${style.aa} `}>
                <div className={`${style.createListContainer} `}>
                    <div className={`${style.createListSection} `}>
                        <button className={` ${style.createListButton} `} onClick={handleClickShow}>{listPage.createListButton}</button>
                        {showMenu && <div ref={menuRef}> <CreateList showMenu={showMenu} handleAddNewList={handleAddNewList} handleClickShow={handleClickShow} /></div>}

                    </div>
                    {isSmallScreen && <button className={`${generalize.buttonStyle_unselected} ${style.myListsButton}`} onClick={changeshowLists}>{listPage.subtitle}</button>}

                </div>

            </div>
            {!isSmallScreen && <ListSection renderList={renderList} isLoadingList={isLoadingList} />}
            {(isSmallScreen && showLists) &&
                <div className={`${style.modalList} `}>
                    <button className={`${style.outCloseButton} `} onClick={changeshowLists}></button>

                    <div className={`${style.asideListSection} `}>
                        <ListSection renderList={renderList} isLoadingList={isLoadingList} />

                    </div>

                </div>}

        </aside>
    )
}
