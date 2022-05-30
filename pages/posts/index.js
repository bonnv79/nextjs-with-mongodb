import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getUrl } from 'utils';
import styles from 'styles/Home.module.scss';

const columns = [
  {
    id: '_id',
    name: 'Id',
  },
  {
    id: 'title',
    name: 'Title',
  },
  {
    id: 'body',
    name: 'Body',
  },
  {
    id: 'date',
    name: 'Date',
  }
]

export default function Posts({ data: initData }) {
  const [selected, setSelected] = useState({});
  const toggle = ({ target: { name } }) => {
    setSelected({ ...selected, [name]: !selected[name] });
  }

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);
  // console.log(data)
  console.log(selected)

  const reloadData = async () => {
    setLoading(true);

    try {
      await fetch(getUrl('/api/posts'), {
        method: 'GET'
      }).then(res => res.json()).then(json => {
        if (json.success) {
          setData(json.data);
        }
        setLoading(false);
      })
    } catch (error) {
      return setLoading(false);
    }
  }

  const publishPost = async (postId) => {
    setLoading(true);

    try {
      await fetch(getUrl('/api/posts'), {
        method: 'PUT',
        body: postId,
      });

      setLoading(false);
      reloadData();
    } catch (error) {
      return setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);

    try {
      await fetch(getUrl('/api/posts'), {
        method: 'DELETE',
        body: postId,
      });

      setLoading(false);
      reloadData();
    } catch (error) {
      return setLoading(false);
    }
  };

  const deleteMutiPost = async () => {
    setLoading(true);

    try {
      const ids = Object.keys(selected).filter(key => selected[key]);

      await fetch(getUrl('/api/posts'), {
        method: 'DELETE',
        body: JSON.stringify(ids),
      });

      setLoading(false);
      reloadData();
    } catch (error) {
      return setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>User</h1>

      <Link href="/posts/add-post">
        <button className={styles.margin}>Create Post</button>
      </Link>

      <button onClick={deleteMutiPost}>Delete selected items</button>

      <div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {
                columns.map(col => {
                  const id = col.id;
                  const value = col.name;
                  return (
                    <th key={id}>
                      {value}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((post, index) => {
                const { _id } = post;
                const checked = selected[_id] || false;
                return (
                  <tr key={post._id}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          id={_id}
                          name={_id}
                          checked={checked}
                          value={checked}
                          onChange={toggle}
                        />
                        <label htmlFor={_id}>Checkbox {index}</label>
                      </div>
                    </td>
                    {
                      columns.map(col => {
                        const value = post[col.id] || '';
                        return (
                          <td key={col.id}>
                            <span className={styles.textOverflow}>
                              {value}
                            </span>
                          </td>
                        )
                      })
                    }
                    <td>
                      <button disabled={post.published || loading} type="button" onClick={() => publishPost(post._id)}>
                        {loading ? 'Publishing' : 'Publish'}
                      </button>
                    </td>
                    <td>
                      <button className={styles.margin} disabled={loading} type="button" onClick={() => deletePost(post._id)}>
                        {loading ? 'Deleting' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

Posts.getInitialProps = async (ctx) => {
  const res = await fetch(getUrl('/api/posts', ctx));
  const json = await res.json();
  return {
    data: json.data,
    message: json.message,
  }
}
