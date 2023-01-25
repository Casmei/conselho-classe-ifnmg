import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyRole } from '../auth/decorators/verify-role.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { userRoles } from './role.enum';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Usuário')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retorna um usuário do sistema' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Cria conta para um professor' })
  @VerifyRole(userRoles.MANAGER)
  @Post('teacher')
  createTeacher(@Body() data: CreateTeacherDto) {
    try {
      return this.userService.createTeacher(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
