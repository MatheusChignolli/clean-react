import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import Login from '../Login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
const inputStatus = sut.getByTestId('status-email')

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render spinner and error on start', () => {
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should start with disabled submit button', () => {
    expect(submitButon.disabled).toBe(true)
  })

  test('Should ensure inputs are required', () => {
    expect(emailInput.title).toBe('Campo Obrigatório')
    expect(inputStatus.className).toBe('status')
    expect(passwordInput.title).toBe('Campo Obrigatório')
  })

  test('Should call validation with correct email', () => {
    fireEvent.change(emailInput, { target: { value: 'any_email' } })
    expect('email').toBe('email')
    expect('any_email').toBe('any_email')
  })

  test('Should call validation with correct email', () => {
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
