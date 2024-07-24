'use client'
import styles from './page.module.css'
import { useUser } from './context/userContext'
import { redirect } from 'next/navigation'

export default function Home() {
  const { user, changeUser } = useUser()
  const logout = () => {
    changeUser({ name: '', email: '', token: '' })
    localStorage.removeItem('user')
  }

  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {user.name === '' && redirect('/login')}
      <p>Olá {user?.name} seja bem vindo(a)!</p>
      <button onClick={logout} className={styles.logout_btn}>
        Sair
      </button>
    </main>
  )
}
