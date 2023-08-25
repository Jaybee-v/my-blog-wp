import React, { useEffect, useState } from "react"
import styles from "../../styles/Blog.module.css"
import Link from "next/link"
export default function Archive() {
    const [articles, setArticles] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const getArticles = async () => {
            const res = await fetch(
                "http://localhost:8888/back/wp-json/wp/v2/posts"
            )
            const posts = await res.json()
            setArticles(posts)
            setLoad(true)
        }
        getArticles()
    }, [])

    return (
        <div className={styles.Blog}>
            <h1>Archive du Blog</h1>
            <div>
                <ul>
                    {load &&
                        articles.map((post: any, index) => {
                            return (
                                <li key={index}>
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title.rendered}
                                    </Link>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}
