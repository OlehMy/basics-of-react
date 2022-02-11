import React, { useEffect, useMemo, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/PostForm';
import PostsFilter from '../components/PostsFilter';
import PostsList from '../components/PostsList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import PostsService from '../API/PostsService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPagesArray, getPagesCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sopt: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostsService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [limit])

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page);
  }

  return (
    <div className="container">
      <div className="posts">
        <MyButton onClick={() => setModal(true)}>
          Create post
        </MyButton>
        <hr style={{ margin: '15px 0' }} />
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <PostsFilter
          filter={filter}
          setFilter={setFilter}
        />
        <hr style={{ margin: '15px 0' }} />
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultName='Quantity on page'
          options={[
            { value: 5, name: '5' },
            { value: 10, name: '10' },
            { value: 25, name: '25' },
            { value: -1, name: 'All' },
          ]}
        />
        <hr style={{ margin: '15px 0' }} />
        {postError &&
          <h1>404</h1>
        }
        {isPostsLoading
          ? <div className='loader__wrapper'> <MyLoader /> </div>
          : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list' />
        }
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
      </div>
    </div>

  );
}

export default Posts;