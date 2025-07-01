import { ApiProperty }     from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice' })
  @Length(2, 30)
  name!: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email!: string;
}