import React from 'react'
import Styles from './styles.sass'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} type={props.type} name={props.name} placeholder={props.placeholder}/>
      <span className={Styles.status}></span>
    </div>
  )
}

export default Input
