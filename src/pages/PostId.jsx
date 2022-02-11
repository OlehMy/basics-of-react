import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostsService from "../API/PostsService";
import MyLoader from "../components/UI/loader/MyLoader";
import { useFetching } from "../hooks/useFetching";

function PostId() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostsService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostsService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id)
  }, []);

  return (
    <div className='container'>
      <div className='post-id'>
        <h1 className='post-id__title'> Post #{params.id} </h1>
        {isLoading
          ? <MyLoader />
          : <div className='post-id__body'>
            <h4>{post.id}. {post.title}</h4>
            <p>{post.body}</p>
          </div>
        }
        <h2 className='post-id__comments'> Comments </h2>
        {isLoading
          ? <MyLoader />
          : <div className='post-id__comments-wrapper'>
            {comments.map(comment =>
              <div className='post-id__comment' key={comment.email}>
                <h4>{comment.email}</h4>
                <p>{comment.body}</p>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default PostId;