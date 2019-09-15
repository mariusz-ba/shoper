import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { Gender } from '../../../entities/UserEntity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsIn([Gender.MALE, Gender.FEMALE])
  gender: Gender;
}
