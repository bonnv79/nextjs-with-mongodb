import { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Home.module.scss';
import { postAPI } from 'utils';
import { API_POSTS } from 'contants/apiPath';

export default function AddPost() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      setTitle('');
      setContent('');
    }, (data) => {
      setError(data.message);
    }, setLoading);
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handlePost} className={styles.form}>
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
              <button className={styles.margin}>Back Posts</button>
            </Link>

            <button type="submit" disabled={loading}>{loading ? 'Adding' : 'Add post'}</button>
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