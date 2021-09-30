/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'
import Item from '@modules/todos/infra/typeorm/entities/Item'

@Entity('todos')
class Todo {
    @PrimaryGeneratedColumn('uuid')
    todo_id: string

    @Column()
    user_id: string

    @ManyToOne(() => User) // esta na documentação
    @JoinColumn({ name: 'user_id' }) // qual coluna vai identifica qual o user deste appointments
    user: User

    @Column()
    title: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Item, (item) => item.todo)
    photos: Item[]
}
// O constructor serve para quando criar uma nova instancia de Appointments possamos passar os parametros

export default Todo
