import React, { useContext } from 'react'
import Styles from './styles.sass'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/context'

const FormStatus: React.FC = () => {
  const {
    isLoading,
    errorMessage
  } = useContext(FormContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading === true && <Spinner className={Styles.spinner} /> }
      { errorMessage !== '' && (<span className={Styles.error}>{errorMessage}</span>) }
    </div>
  )
}

export default FormStatus
