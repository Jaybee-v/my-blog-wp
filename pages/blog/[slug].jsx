import Head from "next/head"
import styles from "../../styles/Blog.module.css"
import Image from "next/image"

export default function Single({ post, featuredImage }) {
    console.log(post)
    const data = post[0]
    console.log(featuredImage)
    return (
        <>
            <Head>
                <title>{data.title.rendered}</title>
            </Head>
            <div className={styles.Blog}>
                <div className={styles.Featured}>
                    {featuredImage && <Image src={featuredImage} alt="" fill />}
                </div>
                <h1>{data.title.rendered}</h1>
                <div
                    dangerouslySetInnerHTML={{ __html: data.content.rendered }}
                ></div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:8888/back/wp-json/wp/v2/posts")
    const posts = await res.json()

    const paths = posts.map((post) => ({
        params: {
            slug: post.slug,
        },
    }))

    return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `http://localhost:8888/back/wp-json/wp/v2/posts/?slug=${params.slug}`
    )
    const post = await res.json()
    const postData = post[0]

    let featuredImage = null
    if (postData.featured_media) {
        const imgRes = await fetch(
            `http://localhost:8888/back/wp-json/wp/v2/media/${postData.featured_media}`
        )
        const imgData = await imgRes.json()
        featuredImage = imgData.source_url
    }
    return { props: { post, featuredImage } }
}
