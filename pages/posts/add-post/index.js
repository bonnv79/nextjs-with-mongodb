import { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Home.module.scss';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!title || !content) return setError('All fields are required');

    let post = {
      title,
      body: content,
      published: true,
      date: new Date().toISOString(),
    };

    let response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });

    let data = await response.json();

    if (data.success) {
      setTitle('');
      setContent('');
      return setMessage(data.message);
    } else {
      return setError(data.message);
    }
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

            <button type="submit">Add post</button>
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