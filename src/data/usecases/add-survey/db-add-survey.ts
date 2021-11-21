import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepositoy: AddSurveyRepository) {}
  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepositoy.add(data)
    return null
  }
}
