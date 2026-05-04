```mermaid
classDiagram
class Token {
    + name: string
    + uid: string
}

Token <|-- ValueToken

class ValueToken {
    + valueByMode: Record<string, ExtendedTokenType>
    + entityType: "token"
}

Token<|-- GroupToken

class GroupToken {
    + expanded: boolean
    + entityType: "group"
}

Token<|-- ReferenceToken
class ReferenceToken {
    + referenceId: string
    + entityType: "reference"
}


class TokenSet {
    - tokens: List<Token>
    - name: string
    - level: 1|2|3|4
    - type: typeof Token

    + addToken(token: TokenNode)
    + removeToken(token: TokenNode)
    + updateToken(tokenId: string, newToken: TokenNode)
    - validateToken(token: TokenNode)
}
```
