import { composeWithMongoose } from 'graphql-compose-mongoose'
import ModelModel from '../../models/model'

import { ProjectTC } from './project'
import { MarkerTC } from './marker'
import { MediaTC } from './media'

export const ModelTC = composeWithMongoose(ModelModel)

