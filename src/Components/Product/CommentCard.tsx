import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useInput } from '../../Hooks/useInput';

import {GET_REVIEWS, IGetReviewsResult} from './ReviewContent'
import {GET_COMMNENTS, IGetCommentsResult} from './ReviewDetail'

import Loader from '../Shared/Loader';
import Error from '../Shared/Error';

const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String, $username: String) {
    deleteComment(commentId: $commentId, username: $username)
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: String, $username: String, $text: String) {
    updateComment(commentId: $commentId, username: $username, text: $text){
      id
      createdAt
      text
      user {
        id
        username
      }
    }
  }
`;

interface ICommentCardProps {
  comment: ICommentCardPropsComment;
  productId: string;
  reviewId: string;
}

interface ICommentCardPropsComment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  }
}

const CommentCard : React.FC<ICommentCardProps> = ({ comment, productId, reviewId }) => {
  const [clickedUpdateComment, setClickedUpdateComment] = useState(false);
  const [updateCommentText, onChnageUpdateCommentText] = useInput(comment.text);
  const { data, loading, error } = useQuery(ME);
  const [deleteCommentMutation, { data: deleteCommentData }] = useMutation(DELETE_COMMENT,{
    update(cache, {data:{deleteComment}}){
      if(deleteComment){
        const {getComments} : IGetCommentsResult = cache.readQuery({query:GET_COMMNENTS,variables:{reviewId}})
        cache.writeQuery({
          query:GET_COMMNENTS,
          variables:{reviewId},
          data:{
            getComments: getComments.filter((item) => {
               return item.id !== comment.id;
            })
          }
        })
        const {getReviews} : IGetReviewsResult = cache.readQuery({query:GET_REVIEWS, variables:{productId}})
        cache.writeQuery({
          query: GET_REVIEWS,
          variables:{productId},
          data:{
            getReviews: getReviews.map((review) => {
              if(review.id === reviewId){
                return {...review, commentCount: review.commentCount - 1}
              }
              return review
            })
          }
        })
      }
    }
  })

  const [updateCommentMutation, { data: updateCommentData }] = useMutation(UPDATE_COMMENT, {
    update(cache, {data:{updateComment}}){
      const {getComments} = cache.readQuery({query:GET_COMMNENTS,variables:{reviewId}})
      cache.writeQuery({
        query:GET_REVIEWS,
        variables:{reviewId},
        data:{
          getComments: [...getComments,updateComment]
        }
      })
      setClickedUpdateComment(!clickedUpdateComment);
    }
  });

  if (loading) return <Loader/>;
  
  if (error) return <Error error={error}/>;

  const onClickUpdateComment = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setClickedUpdateComment(!clickedUpdateComment);
  };

  const onClickDeleteComment = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    deleteCommentMutation({
      variables: {
        commentId: comment.id,
        username: data.me.username,
      },
    });
    console.log(deleteCommentData);
  };

  const onSubmitUpdateComment = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCommentMutation({
      variables: {
        commentId: comment.id,
        username: data.me.username,
        text: updateCommentText,
      },
    });
    console.log(updateCommentData);
  };

  return (
    <>
      <div className="comment-user">
        <span>
          {comment.user.username} - {comment.createdAt}
        </span>
        {comment.user.id === data.me.id && (
          <div>
            <button onClick={onClickUpdateComment}>수정</button>
            <button onClick={onClickDeleteComment}>삭제</button>
          </div>
        )}
      </div>
      <div className="comment-text">
        {clickedUpdateComment ? (
          <form onSubmit={onSubmitUpdateComment}>
            <label>
              <textarea value={updateCommentText} onChange={onChnageUpdateCommentText} />
            </label>
            <button>Submit</button>
          </form>
        ) : (
          <span>{comment.text}</span>
        )}
      </div>
    </>
  );
};

export default CommentCard;
