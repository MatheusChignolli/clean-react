import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import Login from '../Login'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.word()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

const { sut, validationStub } = makeSut()

const errorWrap = sut.getByTestId('error-wrap')
const submitButon = sut.getByTestId('submit') as HTMLButtonElement
const emailInput = sut.getByTestId('email')
const passwordInput = sut.getByTestId('password')
const emailStatus = sut.getByTestId('status-email')
const passwordStatus = sut.getByTestId('status-password')

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render spinner and error on start', () => {
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should start with disabled submit button', () => {
    expect(submitButon.disabled).toBe(true)
  })

  test('Should ensure inputs are required', () => {
    expect(emailInput.title).toBe(validationStub.errorMessage)
    expect(emailStatus.className).toBe('status')
    expect(passwordInput.title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if Validation fails', () => {
    const email = faker.internet.email()
    // TODO: Check why fireEvent is not working
    fireEvent.change(emailInput, { target: { value: email } })
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.className).toBe('status')
  })

  test('Should show password error if Validation fails', () => {
    const password = faker.internet.password()
    // TODO: Check why fireEvent is not working
    fireEvent.change(passwordInput, { target: { value: password } })
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.className).toBe('status')
  })
})
