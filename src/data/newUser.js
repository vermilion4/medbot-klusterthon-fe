export const questions = [
  {
    question: 'Great, what is your first name?',
    type: 'text',
    name: 'firstName',
    placeholder: 'First Name',
    required: true,
  },
  {
    question: 'Hi Tola, are you a male or a female?',
    type: 'radio',
    options: ['Male', 'Female'],
    name: 'gender',
    required: true,
  },
  {
    question: 'And what is your date of birth?',
    type: 'date',
    name: 'dateOfBirth',
    required: true,
  },
  {
    question: 'Are you a current smoker or have you been a smoker in the past?',
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'isSmoker',
    required: true,
  }
]