import users from './users.json'
import pizza from './pizza.json'
import misc from './misc.json'
import { genSalt, hash } from 'bcryptjs'
import { Application } from '../application'
import _ from 'lodash'
import {
  DoughRepository,
  IngredientRepository,
  MiscRepository,
  SauceRepository,
  SizeRepository,
  UserRepository,
} from '../repositories'

const populateUsers = async (
  user: { name: string, email: string, password: string, avatar: string, phone: string },
  userRepository: UserRepository
) => {
  // Проверяем, есть ли уже такой пользователь
  const existing = await userRepository.findOne({ where: { email: user.email } });
  if (!existing) {
    const password = await hash(user.password, await genSalt());
    const newUser = await userRepository.create(_.omit(user, 'password'));
    return userRepository.customUserCredentials(newUser.id).create({ password });
  }
  return existing;
}

const populateDough = async (
  dough: { name: string, image: string, description: string },
  doughRepository: DoughRepository
) => {
  const existing = await doughRepository.findOne({ where: { name: dough.name } });
  if (!existing) {
    return doughRepository.create(dough);
  }
  return existing;
};

const populateIngredients = async (
  ingredient: { name: string, image: string },
  ingredientRepository: IngredientRepository
) => {
  const existing = await ingredientRepository.findOne({ where: { name: ingredient.name } });
  if (!existing) {
    return ingredientRepository.create(ingredient);
  }
  return existing;
};

const populateSauces = async (
  sauce: { name: string },
  sauceRepository: SauceRepository
) => {
  const existing = await sauceRepository.findOne({ where: { name: sauce.name } });
  if (!existing) {
    return sauceRepository.create(sauce);
  }
  return existing;
};

const populateSizes = async (
  size: { name: string, image: string, multiplier: number },
  sizeRepository: SizeRepository
) => {
  const existing = await sizeRepository.findOne({ where: { name: size.name } });
  if (!existing) {
    return sizeRepository.create(size);
  }
  return existing;
};

const populateMisc = async (
  misc: { name: string, image: string, price: number },
  miscRepository: MiscRepository
) => {
  const existing = await miscRepository.findOne({ where: { name: misc.name } });
  if (!existing) {
    return miscRepository.create(misc);
  }
  return existing;
};

export default async function load(app: Application) {
  const usersPromises = users.map(async user => populateUsers(user, await app.getRepository(UserRepository)))
  await Promise.all(usersPromises);

  const doughPromises = pizza.dough.map(async dough => populateDough(dough, await app.getRepository(DoughRepository)))
  await Promise.all(doughPromises);

  const ingredientsPromises = pizza.ingredients.map(async ing => populateIngredients(ing, await app.getRepository(IngredientRepository)))
  await Promise.all(ingredientsPromises);

  const saucesPromises = pizza.sauces.map(async sauce => populateSauces(sauce, await app.getRepository(SauceRepository)))
  await Promise.all(saucesPromises);

  const sizesPromises = pizza.sizes.map(async size => populateSizes(size, await app.getRepository(SizeRepository)))
  await Promise.all(sizesPromises);

  const miscPromises = misc.map(async m => populateMisc(m, await app.getRepository(MiscRepository)))
  await Promise.all(miscPromises);

  console.log('Dummy data is populated (if it was empty)')
}