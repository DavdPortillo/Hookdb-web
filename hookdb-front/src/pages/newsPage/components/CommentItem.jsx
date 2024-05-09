import style from '../css/commentItem.module.css';

export const CommentItem = ({data}) => {

    const dateFormater = new Date(data.date).toLocaleDateString();
    


  return (
    <article className={`${style.commentContainer} `}>
        <div className={`${style.userInfo} `}>
            <div className={`${style.imageContainer} `}>
                <img src={data.user.image} alt={data.user.alt} className={`${style.image} `}/>
            </div>
            <p className={`${style.userName} `}>{data.user.username}</p>
        </div>
        <div className={`${style.commentInfo} `}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, explicabo corporis iure doloribus eaque, ex amet modi vero et animi praesentium. Asperiores incidunt nam quia magnam error non nostrum dolorem!</p>
            <p className={`${style.date} `}>{dateFormater}</p>
        </div>

    </article>
  )
}
