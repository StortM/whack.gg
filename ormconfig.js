module.exports = {
  entities: ['dist/sql/**/*.entity{.ts,.js}'],
  migrations: ['dist/sql/migrations/*{.ts,.js}'],
  seeds: [
    'dist/sql/game-modes/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/positions/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/matches/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/teams/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/champions/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/teams_bans_champions/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/tiers/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/divisions/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/regions/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/ranks/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/summoners/entities/seeds/*.seed{.ts,.js}',
    'dist/sql/masteries/entities/seed/*.seed{.ts,.js}',
    'dist/sql/participants/entities/seeds/*.seed{.ts,.js}'
  ],
  synchronize: true,
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  //factories: ['./src/sql/**/*.factory.{ts,js}'],
  logging: false,
  database: process.env['POSTGRES_DB'],
  cli: { migrationsDir: './src/migrations' }
}
