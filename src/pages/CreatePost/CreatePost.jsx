import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "../../services/api"
import styles from "./createpost.module.css"

function CreatePost() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const navigate = useNavigate()

    async function createPost(e) {
        e.preventDefault()

        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        })

        const data = await response.json()
        console.log(data)
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Create New Post</h1>

                <form className={styles.form} onSubmit={createPost}>
                    <input
                        type="text"
                        placeholder="Enter post title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Write your post..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost