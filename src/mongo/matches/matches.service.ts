import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Match, MatchDocument } from './schema/matches.schema'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createMatch = new this.matchModel(createMatchDto)
    return createMatch.save()
  }

  async findAll(): Promise<Match[] | undefined> {
    return await this.matchModel.find().exec()
  }

  async findOne(id: string): Promise<Match | null> {
    return await this.matchModel.findById(id).exec()
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto
  ): Promise<Match | null> {
    await this.matchModel.findByIdAndUpdate(id, updateMatchDto)
    const res = this.matchModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.matchModel.findByIdAndDelete(id)
  }
}
