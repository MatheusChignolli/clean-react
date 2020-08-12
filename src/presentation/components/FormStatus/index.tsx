import React, { useContext } from 'react'
import Styles from './styles.sass'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/context'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading === true && <Spinner className={Styles.spinner} /> }
      { mainError !== '' && (<span className={Styles.error}>{mainError}</span>) }
    </div>
  )
}

export default FormStatus
