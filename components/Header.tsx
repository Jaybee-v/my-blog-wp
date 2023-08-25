import React from 'react'
import styles from "../styles/Header.module.css"
import Link from 'next/link'
export default function Header() {
  return (
    <header className={styles.Header}>
        <ul>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
        </header>
  )
}
