
import { composeText, generateKey } from '../../../../../helpers/composeText';

import style from '../css/critic.module.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useContext, useEffect, useState } from 'react';
import { removeVoteReview, setReviewVote } from '../../../../../helpers/dataAPI';
import { UserContext } from '../../../../../context/UserContext';
import toast from 'react-hot-toast';
export const Critic = ({ data, reviewVotes, getVotes, userReviews }) => {
  const { user, userLoaded,language } = useContext(UserContext);
  const [vote, setVote] = useState(null)
  const [idReview, setIdReview] = useState(null)
  const warnings = language.warnings;

  const setRating = async (rate) => {
    
    const isSelf = userReviews.some(element => (idReview === element.id))
    
    if(isSelf){
      if ((rate === 1 && vote == null) || (rate === 1 && vote === -1)) {
        await setReviewVote(user.id, data.id, user.accessToken, '1');
        toast.success(warnings.success.voteReview)
  
      } else if ((rate === -1 && vote == null) || (rate === -1 && vote === 1)) {
  
        await setReviewVote(user.id, data.id, user.accessToken, '-1')
        toast.success(warnings.success.voteReview)
  
      }else{
        await removeVoteReview(user.id, idReview, user.accessToken);
        toast.success(warnings.success.removeVoteReview)
  
      }
  
      getVotes()
    }else{
      toast.error(warnings.error.voteYourself)
    }


  }

  useEffect(() => {

    if(userLoaded && reviewVotes){
      const vote = reviewVotes.find(element => element.reviewId === data.id);


      if (vote) {
        setVote(vote.userVote === 1 ? 1 : -1);
        setIdReview(vote.reviewId)
      } else {
        setVote(null)
      }
    }

    

  }, [reviewVotes, data, userLoaded])


  

  return (
    <article className={`${style.critic} `}>
      <div className={`${style.userInfo} `}>
        <section className={`${style.userInfoContainer} `}>
          <div className={`${style.userInformation} `}>
            <div className={`${style.imageprofile} `}>
              <img src={checkProfileImage(data.image ? data.image : '../../../../../../assets/global/userIconAdminPanel.svg')} alt={data.alt} className={`${style.image} `} />
            </div>
            <h3 className={`${style.username} `}>{data.user.username}</h3>
            <div className={`${style.rating} `}>
              <p className={`${style.p} `}>{data.user.gameScoresCount} votaciones -</p>
              <p className={`${style.p} `}>{data.user.reviewsCount} críticas</p>

            </div>
          </div>
          <div className={`${style.rateContainer} `}>
            <p className={`${style.buttonDescription} `}>¿Te resulto útil?</p>
            <div className={`${style.thumbButtonContainer} `}>

              <button className={`${style.thumbButton} ${vote === -1 && style.redButton}`} onClick={() => setRating(-1)}>
                <ThumbDownIcon sx={{ height: '15px', width: '15px' }} style={{ fill: vote === -1 ? 'rgb(211, 74, 74)' : 'white' }}
                />
              </button>
              <button className={`${style.thumbButton} ${vote === 1 && style.greenButton}`}>
                <ThumbUpIcon sx={{ height: '15px', width: '15px' }} style={{ fill: vote === 1 ? 'rgb(74, 211, 83)' : 'white' }} onClick={() => setRating(1)} />
              </button>
            </div>
          </div>

        </section>

      </div>
      <div className={`${style.userReview} `}>
        <div className={`${style.overview} `}>
          <h4 className={`${style.title} `}>{data.title}</h4>
          <div className={`${style.rate} `}>
            <div className={`${style.rateNumber} `}>{data.gameScore}</div>
          </div>
        </div>
        <hr className={`${style.hr} `} />

        <div className={`${style.content} `}>
          {
            splitRewiew(data)
          }

        </div>
        <div className={`${style.criticInformation} `}>
          <div className={`${style.progressBarContainer} `}>
            <div value={data.votes.likes} max={data.votes.likes + data.votes.dislikes} className={`${style.progressBar} `}>
              <div className={`${style.progressBarContent} `} style={{ width: `${(data.votes.likes) * 100 / (data.votes.likes + data.votes.dislikes)}%  ` }}></div>
            </div>
            <span className={`${style.progressBarDescription} `}>{`${data.votes.likes} de ${data.votes.likes + data.votes.dislikes} encontraron útil esta crítica`}</span>
          </div>
          <div className={`${style.date} `}>{formatDate(data.date)}</div>
        </div>
      </div>

    </article>
  )
}

//Returns the review divided into paragraphs.
const splitRewiew = (data) => {
  const a = composeText(data.content);

  return a.map((element) => (
    <p key={generateKey()} className={`${style.pReviews} `}>{element}</p>

  ));
};

//Check if the user has an image, and if not, set a default one
const checkProfileImage = (imageUrl) => {
  return (imageUrl !== '') ? imageUrl : '../../../../../../assets/global/defaultProfileImage.svg';
};

const formatDate = (date) => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  let tempDate = new Date(date);

  return `${tempDate.getDate()} de ${months[tempDate.getMonth()]} de ${tempDate.getFullYear()}`
}