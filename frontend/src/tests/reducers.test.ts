import questionsReducer, { setQuestions } from "../reducers/questionsReducer"
import tokenReducer, { setToken } from "../reducers/tokenReducer"
import answersReducer, {
  setAnswers,
  addAnswer,
} from "../reducers/answersReducer"

import type { AnswerData, AnswersData } from "../services/answers"

describe("questionsReducer", () => {
  test("setQuestions", () => {
    const question = {
      question: "someting",
      id: 0,
    }

    expect(questionsReducer(undefined, setQuestions([question]))).toEqual([
      question,
    ])
  })
})

describe("tokenReducer", () => {
  test("setToken", () => {
    const token = "gibberish"

    expect(tokenReducer(undefined, setToken(token))).toEqual(token)
  })
})

describe("answersReducer", () => {
  test("setAnswers", () => {
    const answers: AnswersData = {
      question: "something",
      answers: [
        {
          answer: "yeah",
          user: "anon",
        },
      ],
    }

    expect(answersReducer(undefined, setAnswers(answers))).toEqual(answers)
  })

  test("addAnswer", () => {
    const answers: AnswersData = {
      question: "something",
      answers: [],
    }

    const answer: AnswerData = {
      answer: "yeah",
      user: "anon",
    }

    expect(answersReducer(answers, addAnswer(answer))).toEqual({
      ...answers,
      answers: [answer],
    })
  })
})
