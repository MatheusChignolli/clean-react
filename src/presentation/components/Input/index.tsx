import React, { useContext } from 'react'
import Styles from './styles.sass'
import { FormContext } from '@/presentation/context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(FormContext)
  const error = errorState[props.name]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return Styles.status
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={getStatus()}></span>
    </div>
  )
}

export default Input
