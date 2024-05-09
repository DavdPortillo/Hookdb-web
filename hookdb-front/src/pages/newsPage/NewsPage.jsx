import { useContext, useEffect, useState } from 'react';
import style from './css/newsPage.module.css';
import { useParams } from 'react-router-dom';
import { addComment, getNewsComments, getNewsInfoPublic } from '../../helpers/dataAPI';
import { CommentItem } from './components/CommentItem';
import { composeText } from '../../helpers/composeText';
import generalize from '../../css/generalize.module.css'
import { UserContext } from '../../context/UserContext';

export const NewsPage = () => {

  const { id } = useParams();
  const [newsInfo, setNewsInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState(null)
  const [showCreateComment, setShowCreateComment] = useState(false)
  const [textArea, setTextArea] = useState(false);
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchGetNewsInfo = async () => {
      const getNewsInfo = await getNewsInfoPublic(id);
      setNewsInfo(getNewsInfo)

      const newsComments = await getNewsComments(id)
      setComments(newsComments)
      setIsLoading(false)


    }

    if (isLoading) {
      fetchGetNewsInfo();

    }

  }, [isLoading])

  const changeShowCreateComment = () => {
    setShowCreateComment(!showCreateComment)
  }

  const sendComment = async () => {
    await addComment(user.id, user.accessToken, textArea, id);
    changeShowCreateComment();
    setIsLoading(true);
  }

  const saveComment = (event) => {
    setTextArea(event.target.value)
  }

  return (


    (!isLoading) &&
    <>
      <div className={`${style.container} `}>
        <h1 className={`${style.headline} `}>{newsInfo.headline}</h1>
        <h2 className={`${style.subHeadline} `}>Apuntan que necesitan dinero para crear nuevas franquicias</h2>
        <div className={`${style.imageContainer} `}>
          <img className={`${style.mainImage} `} src={newsInfo.image} alt="" />
        </div>

        <section className={`${style.bodyNews} `}>
          <article className={`${style.newsInfo} `}>
            <div className={`${style.publisherContainer} `}>
              <div className={`${style.publisherInfo} `}>
                <div className={`${style.publisherImage} `}>
                  <img src={newsInfo.newsAuthor.image} alt={newsInfo.newsAuthor.alt} className={`${style.image} `} />
                </div>
                <div className={`${style.info} `}>
                  <p className={`${style.p} ${style.publisherName}`}>{newsInfo.newsAuthor.name} {newsInfo.newsAuthor.surname}</p>
                  <p className={`${style.p} ${style.publisherNumber}`}>345 Publicaciones</p>
                </div>
              </div>
            </div>
            <div className={`${style.dateContainer} `}>
              <div className={`${style.dateInfo} `}>
                <p className={`${style.p}  ${style.date}`}>{calculateDate(newsInfo.date)}</p>
              </div>
            </div>
          </article>
          <hr className={`${style.hr} `} />
          <section>
            <div className={`${style.paragraphNews} `}>
              {composeText(newsInfo.content).map((paragraph, index) => (<p key={index}>{paragraph}<br /><br /></p>))}
            </div>
          </section>

        </section>


        <hr className={`${style.hr} ${style.hrComments}`} />
        <button className={`${generalize.buttonStyle_unselected}  ${style.commentButton}`} onClick={changeShowCreateComment}>Comentar</button>
        <div className={`${style.commentsContainer} `}>
          {comments != 0 ?
            comments.map(item => (<CommentItem key={item.id} data={item} />)) : <h2>No hay comentarios en la noticia</h2>}
        </div>

      </div>

      {showCreateComment &&
        <div className={`${style.modalContainer} `}>
          <button className={`${style.modalBackground} ${generalize.buttonStyle}`}  onClick={changeShowCreateComment}></button>
          <div className={`${style.modal}`} >

            <div className={`${style.modalInfo} `}>
              <div className={`${style.titleContainer} `}>
                <h2 className={`${style.logo}`}>Añadir un comentario</h2>
                <button className={`${style.closeButton} `} onClick={changeShowCreateComment} >
                  <img src="../../../assets/global/cleanIcon.svg" height={16} width={16} alt="" />
                </button>
              </div>
              <textarea name="" id="" cols="30" rows="10" className={`${generalize.inputTextStyle} ${style.inputText}`} onChange={saveComment}></textarea>
              <button className={`${style.sendButton} ${generalize.buttonStyle_unselected}`} onClick={sendComment}>Enviar</button>
            </div>
          </div>
        </div>}
    </>



  )
}

const calculateDate = (dateValue) => {
  const date = new Date(dateValue);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
}