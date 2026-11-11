import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./home.module.css"

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPosts() {
            let request = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await request.json()
            setPosts(data)
        }
        getPosts()
    }, [])


  return (
    <div className ={styles.container}>
            <header className ={styles.header}>
        <h1>
            home page
        </h1>
        
        <Link className ={styles.createBtn} to="/create">
            Create Post + 
        </Link>
            </header>
        <div className = {styles.postList}>
        {posts.map((post) => (
            <Link 
                className = {styles.postCard}
                key ={post.id} 
                to = {`/posts/${post.id}`}
                >

                <h2 className= {styles.postTitle}> {post.title}</h2>
                <h2 className= {styles.postBody}> {post.body}</h2>

            </Link>
            
        ))}

        </div>
    </div>
  )
}

export default Home