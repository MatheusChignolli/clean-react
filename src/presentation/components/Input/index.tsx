import React, { useContext } from 'react'
import Styles from './styles.sass'
import { FormContext } from '@/presentation/context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[props.name + 'Error']

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    if (error !== '') {
      return error !== false ? Styles.statusOk : Styles.status
    }
  }

  const getTitle = (): string => {
    if (error !== '') {
      return error !== false ? 'Tudo certo' : error
    }
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span data-testid={`status-${props.name}`} title={getTitle()} className={getStatus()}></span>
    </div>
  )
}

export default Input
