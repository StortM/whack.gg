module.exports = {
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  seeds: [
    'dist/game-modes/entities/seeds/*.seed{.ts,.js}',
    'dist/positions/entities/seeds/*.seed{.ts,.js}',
    'dist/matches/entities/seeds/*.seed{.ts,.js}',
    'dist/teams/entities/seeds/*.seed{.ts,.js}',
    'dist/champions/entities/seeds/*.seed{.ts,.js}',
    'dist/teams_bans_champions/entities/seeds/*.seed{.ts,.js}',
    'dist/tiers/entities/seeds/*.seed{.ts,.js}',
    'dist/divisions/entities/seeds/*.seed{.ts,.js}',
    'dist/regions/entities/seeds/*.seed{.ts,.js}',
    'dist/ranks/entities/seeds/*.seed{.ts,.js}',
    'dist/summoners/entities/seeds/*.seed{.ts,.js}',
    'dist/masteries/entities/seed/*.seed{.ts,.js}',
    'dist/participants/entities/seeds/*.seed{.ts,.js}'
  ],
  synchronize: true,
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  factories: [],
  logging: 'all',
  database: process.env['POSTGRES_DB'],
  cli: { migrationsDir: 'migrations' }
}
