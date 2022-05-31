import { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Home.module.scss';
import { postAPI } from 'utils';
import { API_POSTS } from 'contants/apiPath';

export default function AddPost() {
  const date = new Date();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(date);
  const [content, setContent] = useState(date);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!title || !content) return setError('All fields are required');

    let post = {
      title,
      body: content,
      published: false,
      date: new Date().toISOString(),
    };

    postAPI(API_POSTS, {
      body: JSON.stringify(post),
    }, (data) => {
      setMessage(data.message);
      const date = new Date();
      setTitle(date);
      setContent(date);
    }, (data) => {
      setError(data.message);
    }, setLoading);
  };

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.formItem}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="title"
            />
          </div>
          <div className={styles.formItem}>
            <label>Content</label>
            <textarea
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Post content"
            />
          </div>
          <div className={styles.formItem}>
            <Link href="/posts">
              <button className={styles.margin} disabled={loading}>Back Posts</button>
            </Link>

            <button type="button" disabled={loading} onClick={handlePost}>{loading ? 'Adding' : 'Add post'}</button>
          </div>

          {error ? (
            <div className={styles.formItem}>
              <h3 className={styles.error}>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.message}>{message}</h3>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}