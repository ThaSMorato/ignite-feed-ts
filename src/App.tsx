import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Post from './components/Post';

import styles from './App.module.css'

import './global.css';

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface Posts {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

const posts : Posts[] = [
  {
    id: 1,
    author: {
      name: 'Thales Morato',
      avatar: 'https://github.com/ThaSMorato.png',
      role: 'Senior FS Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-11-18 09:30:00'),
  },
  {
    id: 1,
    author: {
      name: 'Thales Morato',
      avatar: 'https://github.com/ThaSMorato.png',
      role: 'Senior FS Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-11-18 09:30:00'),
  }
]

function App() {
  return (
    <div>
    <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map((post) => (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            ))
          }
        </main>
      </div>
    </div>
  )
}

export default App
