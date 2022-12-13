import { Node } from 'neo4j-driver'

export class Summoner {
  constructor(private readonly node: Node) {}

  getId(): string {
    return (<Record<string, unknown>>this.node.properties).id as string
  }

  getPassword(): string {
    return (<Record<string, unknown>>this.node.properties).password as string
  }

  getClaims() {
    const { username, email, bio, image } = <Record<string, unknown>>(
      this.node.properties
    )

    return {
      sub: username,
      username,
      email,
      bio,
      image: image || 'https://picsum.photos/200'
    }
  }

  toJson(): Record<string, any> {
    const { password, bio, image, ...properties } = <Record<string, any>>(
      this.node.properties
    )

    return {
      image: image || 'https://picsum.photos/200',
      bio: bio || null,
      ...properties
    }
  }
}
