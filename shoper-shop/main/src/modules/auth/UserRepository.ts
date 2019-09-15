import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { InternalServerErrorException } from '../../core/exceptions/InternalServerErrorException';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { User } from '../../entities/UserEntity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, gender } = createUserDto;

    const user = new User();
    user.email = email;
    user.gender = gender;
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') { // Duplicated values
        const exception = new BadRequestException(
          'Invalid arguments',
          {
            email: 'User with this email already exists'
          }
        );

        throw exception;
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User|null> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
