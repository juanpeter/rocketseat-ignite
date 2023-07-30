import { Comment } from './Comment'
import { Avatar } from './Avatar'
import styles from './Post.module.css'

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content } : PostProps) {

  const [comments, setComments]  = useState([] as string[])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(
      publishedAt,
      "d 'de' LLLL 'de' y 'às' HH:mm'h'", 
    {
      locale: ptBR
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const handleCreateNewComment = async (event : FormEvent) => {
    event.preventDefault()
    
    setComments([...comments, newCommentText])

    setNewCommentText('')
  }

  const handleNewCommentChange = async (event : ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  const handleNewCommentInvalid = async (event : InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const deleteComment = async (commentToDelete : string) => {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src= { author.avatarUrl } />
          <div className={ styles.authorInfo } >
            <strong>{ author.name }</strong>
            <span>{ author.role }</span>
          </div>
        </div>

        <time title= { publishedDateFormatted } dateTime= { publishedAt.toString() } >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        { content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}> { line.content } </p>
          } else {
            return <p key={line.content}><a href={ line.content }>{line.content}</a></p>
          }
        }) }
      </div>


      <form onSubmit={ handleCreateNewComment } className={styles.commentForm}>
        <textarea 
          name='comment'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty} >
            Publicar
          </button>
          </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return (
              <Comment 
                key={ comment } 
                content={ comment } 
                onDeleteComment={ deleteComment } 
              />)
          })
        }
      </div>
    </article>
  )
}