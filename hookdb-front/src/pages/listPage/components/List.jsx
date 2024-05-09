import { useEffect, useRef, useState } from 'react';
import style from '../css/list.module.css';
import { useCloseTool } from '../../../hooks/useCloseTool';
import { ListOptions } from '../../../tooltips/ListOptions/ListOptions';
import { DeleteListWarning } from '../../../modals/components/DeleteListWarning';

export const List = ({ list = null, handleChangeListCollection, handleDeleteList }) => {

  const { handleChangeList, activeList, changeNameList } = handleChangeListCollection;


  const menuRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef();

  const { showMenu, handleClickShow } = useCloseTool(menuRef);
  const [edit, setEdit] = useState(false);
  const [nameList, setNameList] = useState(list.name);
  const [originalName, setOriginalName] = useState(list.name);

  const [displayWarning, setDisplayWarning] = useState(false)


  useEffect(() => {
      const handleClickOutsideEdit = (event) => {

              if(edit && !listRef.current.contains(event.target)){
                setEdit(false);

              }
          
      };

      document.addEventListener("mousedown", handleClickOutsideEdit);

      return () => {
          document.removeEventListener("mousedown", handleClickOutsideEdit);
      };
  }, [menuRef, showMenu]);






  const handleEditList = () => {
    setEdit(!edit);
  }

  const handleUpdateNameList = () => {
    if (inputRef.current.value === ''  || inputRef.current.value.length > 40 || inputRef.current.value.length < 4 || !isNaN(inputRef.current.value)) {
      setNameList(originalName)    
      handleEditList();
  
      return;
    }
    setOriginalName(nameList)

    handleEditList();
    changeNameList(list.id, inputRef.current.value);

  }

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const handleChangeNameList = (event) => {
    setNameList(event.target.value);
  }

  const cancelEdit = () => {
    handleEditList();
    setNameList(originalName);
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
    handleClickShow();
  }

  const changeDisplayWarning = () => {
    setDisplayWarning(!displayWarning);
  }



  return (
    <article className={`${style.list} ${activeList === list.id && style.listActive}`} ref={listRef} onClick={() => handleChangeList(list.id)}>
      <div className={`${style.listChild} ${style.nameList}`}>
        {!edit ? <p className={`${style.nameListP} `}>{nameList}</p> : <input ref={inputRef} className={`${style.inputText} `} type="text" name="" id="" placeholder={nameList} onChange={handleChangeNameList} />}

      </div>

      {
        edit ?
          <section className={`${style.buttonContainer} `} onClick={(event) => { event.stopPropagation() }}>
            <button className={`${style.button} `} onClick={handleUpdateNameList}>
              <img src="../../../../assets/global/saveIcon.svg" alt="" />
            </button>
            <button className={`${style.button} `} onClick={cancelEdit}>
              <img src="../../../../assets/global/cleanIcon.svg" alt="" />
            </button>
          </section> :



          <>
            <div className={`${style.listChild} `}>
              <p>{list.gamesCount}</p>
            </div>
            <div className={`${style.listChild} ${style.configuration}`}>

              <div>
                <button className={`${style.seeMoreButton} `} onClick={(event) => { stopPropagation(event) }}>

                  <img className={`${style.seeMoreImage} `} src="../../../../assets/global/seeMore.svg" alt="" height={15} width={3} />
                </button>

                {
                  showMenu && <div ref={menuRef}><ListOptions stopPropagation={stopPropagation} handleEditList={handleEditList} changeDisplayWarning={changeDisplayWarning}  /></div>
                }

              </div>
            </div>
          </>
      }

      {displayWarning && <DeleteListWarning changeDisplayWarning={changeDisplayWarning} handleDeleteList={handleDeleteList} id={list.id}/>}
    </article>
  )
}
