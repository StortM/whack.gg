import { Node } from 'neo4j-driver'

export type Participant = {
  id: string
  assists: string
  deaths: string
  kills: string
  baronKills: string
  consumablePurchased: string
  damageDealtToBuildings: string
  damageDealtToObjectives: string
  damageDealtToTurrets: string
  damageSelfMitigated: string
  doubleKills: string
  tripleKills: string
  quadraKills: string
  pentaKills: string
}

export class ParticipantNode {
  constructor(private readonly node: Node) {}

  getId(): string {
    return (<Record<string, unknown>>this.node.properties).id as string
  }

  toJson(): Participant {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, level, icon, ...rest } = <Record<string, unknown>>(
      this.node.properties
    )

    return this.node.properties as Participant
  }
}
