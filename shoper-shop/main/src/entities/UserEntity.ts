import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: Gender;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
