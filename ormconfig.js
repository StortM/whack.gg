module.exports = {
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/summoner/entities/*.entity{.ts,.js}'
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  seeds: [
    'dist/gamemodes/entities/seeds/*.seed{.ts,.js}',
    'dist/position/entities/seeds/*.seed{.ts,.js}',
    'dist/match/entities/seeds/*.seed{.ts,.js}',
    'dist/teams/entities/seeds/*.seed{.ts,.js}',
    'dist/teams_bans_champions/entities/seeds/*.seed{.ts,.js}',
    'dist/tier/entities/seeds/*.seed{.ts,.js}',
    'dist/division/entities/seeds/*.seed{.ts,.js}',
    'dist/region/entities/seeds/*.seed{.ts,.js}',
    'dist/champions/entities/seeds/*.seed{.ts,.js}',
    'dist/ranks/entities/seeds/*.seed{.ts,.js}',
    'dist/summoner/entities/seeds/*.seed{.ts,.js}',
    'dist/participants/entities/seeds/*.seed{.ts,.js}'
  ],
  synchronize: true,
  type: 'postgres',
  host: process.env['POSTGRES_DB_ALT_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  factories: [],
  logging: 'all',
  database: process.env['POSTGRES_DB'],
  cli: { migrationsDir: 'migrations' }
}
