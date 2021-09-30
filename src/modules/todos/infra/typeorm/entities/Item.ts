/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import Todo from '@modules/todos/infra/typeorm/entities/Todo'

export type CategoriasType =
    | 'lazer'
    | 'saude'
    | 'moradia'
    | 'eduação'
    | 'carro'
    | 'ventuario'
    | 'beleza'
export type statusType = 'quero' | 'comprei' | 'cancelei' | 'adiei'
export type prioridadeType = 1 | 2 | 3 | 4

@Entity('items')
class Item {
    @PrimaryGeneratedColumn('uuid')
    item_id: string

    @Column()
    todo_id: string

    @ManyToOne(() => Todo)
    @JoinColumn({ name: 'todo_id' })
    todo: Todo

    @Column()
    title: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    link_foto: string

    @Column({ type: 'jsonb', default: '{}' })
    links_compra: JSON

    @Column({
        type: 'enum',
        default: 'quero',
        enum: ['quero', 'comprei', 'cancelei', 'adiei'],
    })
    status: statusType

    @Column({ type: 'enum', default: 4, enum: [1, 2, 3, 4] })
    prioridade: prioridadeType

    @Column({
        type: 'enum',
        default: 'lazer',
        enum: [
            'lazer',
            'saude',
            'moradia',
            'eduação',
            'carro',
            'ventuario',
            'beleza',
        ],
    })
    categoria: CategoriasType

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Item
