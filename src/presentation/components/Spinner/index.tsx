import React from 'react'
import Styles from './styles.sass'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(' ')}><div></div></div>
  )
}

export default Spinner
