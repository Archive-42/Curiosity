import { combineReducers } from 'redux'
import charactersReducer from './charactersReducer'
import categoriesReducer from './categoriesReducer'
import traitTypesReducer from './traitTypesReducer'
import traitsReducer from './traitsReducer'
import tagTypesReducer from './tagTypesReducer'
import tagsReducer from './tagsReducer'
import settingsReducer from './settingsReducer'
import generatorReducer from './generatorReducer'
import tagTypeChancesReducer from './tagTypeChancesReducer'
import genSettingsReducer from './genSettingsReducer'


const genRootReducer = combineReducers({
  characters: charactersReducer,
  categories: categoriesReducer,
  traitTypes: traitTypesReducer,
  traits: traitsReducer,
  tagTypes: tagTypesReducer,
  tags: tagsReducer,
  setting: settingsReducer,
  generator: generatorReducer,
  tagTypeChances: tagTypeChancesReducer,
  genSettings: genSettingsReducer,
})

export default genRootReducer