        import { useParams } from "react-router-dom"
        import { useEffect, useState } from "react"
        import { useNavigate } from "react-router-dom"
        import API_URL from "../../services/api"
        import styles from "./postdetails.module.css"


        function PostDetails() {
            const [comments ,setComments] = useState([])
            const [isEditing, setIsEditing] = useState(false)
            const [newTitle, setNewTitle] = useState("")
            const [newBody, setNewBody] = useState("")
            const [post, setPost] = useState(null)
            const navigate = useNavigate()
            const { id } = useParams() 

            useEffect( ()=> {
                async function getPost(){
                const request = await fetch(`${API_URL}/posts/${id}`)
                const data = await request.json()
                setPost(data)
                }
                async function getComments(){
                    const requestComments = await fetch(`${API_URL}/posts/${id}/comments`)
                    const comData = await requestComments.json()
                    setComments(comData)
                }
                getPost()
                getComments()
                
            }, [id])

            async function DeletePost() {
                const info = await fetch(`${API_URL}/posts/${id}`,{
                    method: "DELETE"
                })
                navigate("/")
            }
            async function EditPost() {
                const edInfo = await fetch(`${API_URL}/posts/${id}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle,
                        body: newBody
                    })
                })
                const updatePost = await edInfo.json()
                setPost(updatePost)
                setIsEditing(!isEditing)
            }

            if (!post) {
            return <h1>Loading...</h1>
            }
            return (
                
            <>
            <h1>Home Page</h1>
                <div className = {styles.PostCard}>
                    <h1 className = {styles.postTitle}>
                        {post.title}
                    </h1>
                    <p className={styles.postBody}>
                        {post.body}
                    </p>
                    {isEditing &&(
                    <div className = {styles.editOverlay}>
                        <div className = {styles.overlayContent}>
                        <input 
                        placeholder="enter the new title"
                        value = {newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        />

                        <textarea 
                        placeholder="enter the new body"
                        value = {newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        />

                        <button onClick={EditPost}>
                            submit changes
                        </button>
                        </div>
                    </div> 
                    )}

                    <button className ={styles.deleteBtn} onClick={DeletePost}>
                        Delete
                    </button>

                    <button className={styles.editBtn} 
                        onClick = {() => {
                        setNewTitle(post.title)
                        setNewBody(post.body)
                        setIsEditing(true)
                    }}>
                        Edit
                    </button>

                </div>

                    <section className ={styles.comSec}>
                        <h2 className={styles.ComTitle}>
                            Comments {comments.length}
                        </h2>
                    <div className = {styles.comList}>
                        {comments.map((comment) => (
                            <div className = {styles.comCard} key = {comment.id}>
                                <div className={styles.comHead}>
                                    <h3>{comment.name}</h3>
                                    <span>{comment.email}</span>
                                    <p className ={styles.comBody}>
                                        {comment.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    </section>
            </>
        )

        }

        export default PostDetails