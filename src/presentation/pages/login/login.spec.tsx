import React from 'react'
import { render } from '@testing-library/react'
import Login from '../Login'

const { getByTestId } = render(<Login />)

const errorWrap = getByTestId('error-wrap')
const submitButon = getByTestId('submit') as HTMLButtonElement

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should start with disabled submit button', () => {
    expect(submitButon.disabled).toBe(true)
  })
})