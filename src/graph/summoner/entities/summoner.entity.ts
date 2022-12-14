import { Node } from 'neo4j-driver'

export type Summoner = {
  id: string
  summonerName: string
  passwordHash: string
  isAdmin: boolean
  level: number | null
  icon: number | null
}

export type SummonerOmittingPasswordHash = Omit<Summoner, 'passwordHash'>

export class SummonerNode {
  constructor(private readonly node: Node) {}

  getId(): string {
    return (<Record<string, unknown>>this.node.properties).id as string
  }

  getPassword(): string {
    return (<Record<string, unknown>>this.node.properties).password as string
  }

  toJson(): Summoner {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { level, icon, ...rest } = <Record<string, unknown>>(
      this.node.properties
    )

    return {
      icon: icon || null,
      level: level || null,
      ...rest
    } as Summoner
  }
}
