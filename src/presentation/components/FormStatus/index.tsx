import React, { useContext } from 'react'
import Styles from './styles.sass'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)
  const { isLoading } = state
  const { main } = errorState
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading === true && <Spinner className={Styles.spinner} /> }
      { main !== '' && (<span className={Styles.error}>{main}</span>) }
    </div>
  )
}

export default FormStatus
