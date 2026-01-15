export type AgentType = "support" | "order" | "billing"

export interface RouterResult {
  agent: AgentType
  reason: string
}
