import { Instance } from 'src/module/instance/entities/instance.entity';
import { Student } from 'src/module/student/entities/student.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Class extends CustomBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Instance, (instance) => instance.classes)
  instance: Instance;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
