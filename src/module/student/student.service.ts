import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassService } from '../class/class.service';
import { CourseService } from '../course/course.service';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly classService: ClassService,
    private readonly courseService: CourseService,
  ) {}
  async createParseCsv(instanceId: number, file: string) {
    const lines = file.split(/\r?\n/).slice(1);
    const students = [];

    for (const line of lines) {
      const [name, registration, contract, course, className] = line.split(',');

      const student = new Student();
      student.name = name;
      student.registration = registration;
      student.contract = contract;

      const courseObj = await this.courseService.retrieveOrCreate(instanceId, {
        name: course,
      });

      student.course = courseObj;

      const classObj = await this.classService.retrieveOrCreate(instanceId, {
        name: className,
      });

      student.class = classObj;

      students.push(student);
    }

    await this.studentRepository.save(students);
  }

  async updateStudentCsv(instanceId: number, file: string) {
    const lines = file.split(/\r?\n/).slice(1);

    for (const line of lines) {
      const [name, registration, contract, course, className] = line.split(',');

      const student = await this.studentRepository.findOne({
        where: {
          registration,
        },
      });

      if (student) {
        student.name = name;
        student.contract = contract;

        const courseObj = await this.courseService.retrieveOrCreate(
          instanceId,
          {
            name: course,
          },
        );

        student.course = courseObj;

        const classObj = await this.classService.retrieveOrCreate(instanceId, {
          name: className,
        });
        student.class = classObj;

        this.studentRepository.update(student.id, student);
      }
    }
  }
}
