import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';

function PostsList({ posts, title, remove }) {

  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center', color: 'red' }}>
        Posts not found!
      </h1>
    )
  }

  return (
    <div className=''>
      <h1 className='posts__title'>
        {title}
      </h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

export default PostsList;