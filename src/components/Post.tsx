import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import Avatar from "./Avatar";
import Comment from "./Comment";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatar: string;
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

function Post({author, publishedAt,  content }: PostProps) {
  const [newCommentText, setNewCommentText] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const publishedDateFormatter = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function newCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }


  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Ésse campo eh obrigatorio')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)
    setComments(commentsWithoutDeletedOne);
  }
  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar} />
          <div className={styles.authorInfo}>
            <strong>{ author.name }</strong>
            <span>{ author.role }</span>
          </div>
        </div>

        <time title={publishedDateFormatter} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          content.map((item) =>{
            if(item.type === 'paragraph') {
              return <p key={item.content}>{item.content}</p>
            } else if(item.type === 'link') {
              return <p key={item.content}><a href='#'>{item.content}</a></p>
            }
          })
        }
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder="Deixe seu comentario"
          onChange={newCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button
            disabled={isNewCommentEmpty}
            onClick={handleCreateNewComment}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map((comment) => (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          ))
        }
      </div>
    </article>
  );
}

export default Post;
