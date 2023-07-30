import { Header } from './components/Header'
import { Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"


import styles from './app.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/juanpeter.png",
      name: "João Pedro Israel",
      role: "Web Developer"
    },
    content: [
      { type: 'paragraph', content: "Fala galera!" },
      { type: 'paragraph', content: "Acabei de começar um novo curso no Ignite!" },
      { type: 'paragraph', content: "Estou bastante animado!"},
      { type: 'paragraph', content: "Me chequem no ➡️" },
      { type: 'link', content: 'https://www.linkedin.com/in/jpisrael/'}
    ],
    publishedAt: new Date("2022-08-22, 13:00:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/johndoe.png",
      name: "John Doe",
      role: "Anon"
    },
    content: [
      { type: 'paragraph', content: "Fala galera!" },
      { type: 'paragraph', content: "Acabei de começar um novo curso no Ignite!" },
      { type: 'paragraph', content: "Estou bastante animado!"},
      { type: 'paragraph', content: "Me chequem no ➡️" },
      { type: 'link', content: 'https://www.linkedin.com/in/jpisrael/'}
    ],
    publishedAt: new Date("2022-08-23, 15:00:00")
  }
]

export function App() {
  return (
    <div>

      <Header />

      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {posts.map(
            post => {
              return (
                <Post 
                  key={post.id}
                  author = {post.author}
                  content = {post.content}
                  publishedAt = {post.publishedAt}
                />
                )
            }
          )}
        </main>

      </div>
    </div>
  )
}