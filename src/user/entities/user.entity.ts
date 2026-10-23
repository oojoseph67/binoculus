import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Roles = 'patient' | 'doctor' | 'admin';
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Index({
    unique: true,
  })
  @Column({
    type: 'string',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  lastName: string;

  @Index({
    unique: true,
  })
  @Column({
    type: 'string',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'string',
    default: 'patient',
  })
  role: Roles;

  @Column({
    type: 'char',
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
