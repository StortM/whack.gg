export type RiotSummoner = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export type RegionName =
  | 'BR'
  | 'EUNE'
  | 'EUW'
  | 'JP'
  | 'KR'
  | 'LAN'
  | 'LAS'
  | 'NA'
  | 'OCE'
  | 'TR'
  | 'RU'
  | 'PBE'

export const RegionCodes = {
  BR: 'br1',
  EUNE: 'eun1',
  EUW: 'euw1',
  JP: 'jp1',
  KR: 'kr',
  LAN: 'la1',
  LAS: 'la2',
  NA: 'na1',
  OCE: 'oc1',
  TR: 'tr1',
  RU: 'ru',
  PBE: 'pbe1'
}
