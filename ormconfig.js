module.exports = {
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  type: 'postgres',
  host: 'localhost',
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  seeds: ['src/{tier,region,position}/entities/seeds/*{.ts,.js}'],
  entities: ['src/{tier,users,region,position}/entities/*{.ts,.js}'],
  factories: [],
  database: process.env['POSTGRES_DB'],
  cli: { migrationsDir: 'migrations' }
}
