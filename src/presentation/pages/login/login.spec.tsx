import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from '../Login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

const { sut } = makeSut()

const errorWrap = sut.getByTestId('error-wrap')
const submitButon = sut.getByTestId('submit') as HTMLButtonElement
const emailStatus = sut.getByTestId('email')
const passwordStatus = sut.getByTestId('password')
const inputStatus = sut.getByTestId('email-status')

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should start with disabled submit button', () => {
    expect(submitButon.disabled).toBe(true)
  })

  test('Should ensure inputs are required', () => {
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(inputStatus.className).toBe('status')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
  })
})
