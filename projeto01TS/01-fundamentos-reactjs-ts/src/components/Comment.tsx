import { Trash, ThumbsUp } from 'phosphor-react'
import { useState } from 'react'

import { Avatar } from './Avatar'

import styles from './Comment.module.css'

interface CommentProps {
  content: string;
  onDeleteComment: (comment : string) => void;
}

export function Comment({ content, onDeleteComment } : CommentProps) {

  const [likeCount, setLikeCount] = useState(0)
  
  const handleDeleteComment = async () => {

    onDeleteComment(content)
  }

  const handleLikeComment = async () => {
    setLikeCount((state) => {
      return state + 1;
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/juanpeter.png"/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>

          <header>
            <div className={styles.authorAndTime}>
              <strong>João Pedro Israel</strong>

              <time title='6 de Agosto de 2022 as 18:15' dateTime='2022-08-06 18:15:00'>
                Cerca de 1h atrás
              </time>
            </div>


            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{ content }</p>

          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp />
              Aplaudir <span>{likeCount}</span>
            </button>            
          </footer>
        </div>
      </div>
    </div>
  )
}