'use client'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Header.module.css"
import Link from 'next/link'

const HEADER_DATA = [
  {
    label: "Accueil",
    href: "/"
  },
  {
    label: "Blog",
    href: "/blog"
  }
]
export default function Header() {
  const [url, setUrl] = useState('')
  useEffect(()=>{
    

      const href = window.location.href
      setUrl(href)
    
}, [])  
  return (
    <header className={styles.Header}>
        <ul>
          {HEADER_DATA.map((link)=>(
            <li key={link.label}><Link className={`${url.endsWith(link.href) ? `${styles.active}`: ""}`} href={link.href}>{link.label}</Link></li>

          ))}
        </ul>
        </header>
  )
}


