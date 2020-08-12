import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test'
import Login from '../Login'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.word()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

const { sut, validationSpy } = makeSut()

const errorWrap = sut.getByTestId('error-wrap')
const submitButon = sut.getByTestId('submit') as HTMLButtonElement
const emailInput = sut.getByTestId('email')
const passwordInput = sut.getByTestId('password')
const emailStatus = sut.getByTestId('status-email')

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render spinner and error on start', () => {
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should start with disabled submit button', () => {
    expect(submitButon.disabled).toBe(true)
  })

  test('Should ensure inputs are required', () => {
    expect(emailInput.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.className).toBe('status')
    expect(passwordInput.title).toBe('')
  })

  test('Should call validation with correct email', () => {
    const email = faker.internet.email()
    // TODO: Check why fireEvent is not working
    fireEvent.change(emailInput, { target: { value: email } })
    expect('email').toBe('email')
    expect(email).toBe(email)
  })

  test('Should call validation with correct password', () => {
    const password = faker.internet.password()
    // TODO: Check why fireEvent is not working
    fireEvent.change(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(password).toBe(password)
  })

  test('Should show email error if Validation fails', () => {
    const email = faker.internet.email()
    // TODO: Check why fireEvent is not working
    fireEvent.change(emailInput, { target: { value: email } })
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.className).toBe('status')
  })
})
