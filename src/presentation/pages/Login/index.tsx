import React, { useState, useEffect } from 'react'
import Styles from './styles.sass'
import { FormStatus, Footer, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: 'any_email',
    password: 'any_password',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: typeof validation !== 'undefined' && validation.validate('email', state.email),
      passwordError: typeof validation !== 'undefined' && validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={ { state, setState } }>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" title={state.emailError} placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" title={state.passwordError} placeholder="Digiste sua senha"/>
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
