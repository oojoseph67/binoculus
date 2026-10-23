import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Roles = 'patient' | 'doctor' | 'admin';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Index({
    unique: true,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Index({
    unique: true,
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    default: 'patient',
  })
  role: Roles;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseUsername() {
    if (this.username) {
      this.username = this.username.toLowerCase();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
