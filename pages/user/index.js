import Head from 'next/head';
import { getUrl } from 'utils';

const columns = [
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'email',
    name: 'Email',
  },
  {
    id: 'password',
    name: 'Password',
  }
]

export default function User({ data }) {
  // console.log(data)
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>User</h1>
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
              data.map(item => {
                return (
                  <tr key={item._id}>
                    {
                      columns.map(col => {
                        const id = col.id;
                        const value = String(item[id]) || '';
                        return (
                          <td key={id}>
                            {value}
                          </td>
                        )
                      })
                    }
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

User.getInitialProps = async (ctx) => {
  const res = await fetch(getUrl(ctx, '/api/user'))
  const json = await res.json()
  return {
    data: json['data'],
    message: json['message']
  }
}
