/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import Todo from '@modules/todos/infra/typeorm/entities/Todo'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Todo, (todo) => todo.user)
    todo: Todo[]
}
// O constructor serve para quando criar uma nova instancia de Users possamos passar os parametros

export default User
