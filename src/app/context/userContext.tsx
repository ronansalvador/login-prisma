'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import saveUser from '../helper/saveUser'

type User = {
  id?: number
  name: string
  email: string
  token: string
}

interface UserContextProps {
  user: User
  changeUser: (user: User) => void // Correção na tipagem da função changeUser
  // useInactivity: (timeout: number) => void // Correção na tipagem da função changeUser
}

const UserContext = createContext<UserContextProps>({
  user: { name: '', email: '', token: '' }, // Define um estado inicial válido
  changeUser: () => {},
  // useInactivity: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ name: '', email: '', token: '' })

  const changeUser = async (newUser: User) => {
    setUser(newUser) // Usa o newUser passado como parâmetro
    // Usa o newUser passado como parâmetro
    saveUser(JSON.stringify(newUser)) // E depois chama a função para salvar no localStorage
  }

  useEffect(() => {
    // Isso será executado após `user` ser atualizado
    if (user && (user.name || user.email || user.token)) {
      saveUser(JSON.stringify(user)) // Salva no localStorage após a atualização do estado
    }
  }, [user]) // A dependência deste efeito é o estado `user`

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser)) // Carrega o estado inicial do `localStorage`
    }
  }, [])

  // function useInactivity(timeout = 2400000, onInactive) {
  //   useEffect(() => {
  //     let timer

  //     const resetTimer = () => {
  //       clearTimeout(timer)
  //       timer = setTimeout(onInactive, timeout)
  //     }

  //     window.addEventListener('mousemove', resetTimer)
  //     window.addEventListener('keydown', resetTimer)
  //     window.addEventListener('scroll', resetTimer)

  //     resetTimer() // Iniciar o timer na montagem

  //     return () => {
  //       clearTimeout(timer) // Limpar timer no desmonte
  //       window.removeEventListener('mousemove', resetTimer)
  //       window.removeEventListener('keydown', resetTimer)
  //       window.removeEventListener('scroll', resetTimer)
  //     }
  //   }, [timeout, onInactive])
  // }

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
