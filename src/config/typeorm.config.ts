import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '201526',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
}