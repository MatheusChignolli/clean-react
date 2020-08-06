import React, { useState } from 'react'
import Styles from './styles.sass'
import { FormStatus, Footer, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo Obrigatório',
    password: 'Campo Obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={ { state, errorState } }>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input data-testid="email" type="email" name="email" title={errorState.email} placeholder="Digite seu e-mail"/>
          <Input data-testid="password" type="password" name="password" title={errorState.password} placeholder="Digiste sua senha"/>
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Login
