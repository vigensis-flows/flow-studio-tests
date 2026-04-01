/**
 * Knowledge Graph API Client
 *
 * Bun + TypeScript client for the FlowStudio Knowledge Graph API.
 * Used by Claude CLI skills to build and maintain the knowledge graph.
 *
 * Environment variables:
 * - VIA_API_TOKEN — API bearer token (required)
 * - FLOW_STUDIO_URL — Base URL (default: http://localhost:4100)
 */

const BASE_URL = process.env.FLOW_STUDIO_URL || "http://localhost:4100";
const TOKEN = process.env.VIA_API_TOKEN;

if (!TOKEN) {
  console.error(
    "Error: VIA_API_TOKEN environment variable is required"
  );
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

async function request(
  method: string,
  path: string,
  body?: unknown
): Promise<unknown> {
  const url = `${BASE_URL}${path}`;
  const opts: RequestInit = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

// --- Entities ---

export async function listEntities(type?: string) {
  const params = type ? `?type=${type}` : "";
  return request("GET", `/api/graph/entities${params}`);
}

export async function getEntity(id: string) {
  return request("GET", `/api/graph/entities/${id}`);
}

export async function createEntity(entity: {
  name: string;
  type: string;
  description: string;
}) {
  return request("POST", "/api/graph/entities", entity);
}

export async function updateEntity(
  id: string,
  updates: { name?: string; type?: string; description?: string }
) {
  return request("PUT", `/api/graph/entities/${id}`, updates);
}

export async function deleteEntity(id: string) {
  return request("DELETE", `/api/graph/entities/${id}`);
}

// --- Relationships ---

export async function createRelationship(rel: {
  type: string;
  description?: string;
  strength?: number;
  source_entity_id: string;
  target_entity_id: string;
}) {
  return request("POST", "/api/graph/relationships", rel);
}

export async function deleteRelationship(id: string) {
  return request("DELETE", `/api/graph/relationships/${id}`);
}

// --- Provenance ---

export async function createEntityProvenance(prov: {
  entity_id: string;
  chunk_id: string;
  work_id: string;
  snippet?: string;
}) {
  return request("POST", "/api/graph/entity-provenance", prov);
}

export async function createRelationshipProvenance(prov: {
  relationship_id: string;
  chunk_id: string;
  work_id: string;
  snippet?: string;
}) {
  return request("POST", "/api/graph/relationship-provenance", prov);
}

// --- Changes ---

export async function listChanges(): Promise<{ changes: unknown[] }> {
  return request("GET", "/api/graph/changes") as Promise<{
    changes: unknown[];
  }>;
}

export async function acknowledgeChange(id: string) {
  return request("POST", `/api/graph/changes/${id}/acknowledge`);
}

// --- Search ---

export async function searchCorpus(
  query: string,
  opts?: { max_results?: number; domain_id?: string }
) {
  return request("POST", "/api/graph/search", { query, ...opts });
}

// --- Work Chunks ---

export async function getWorkChunks(workId: string) {
  return request("GET", `/api/graph/works/${workId}/chunks`);
}

// --- CLI Entry Point ---

const command = process.argv[2];
const args = process.argv.slice(3);

// Parse --flag value pairs from args, returning { flags, positional }
function parseArgs(args: string[]) {
  const flags: Record<string, string> = {};
  const positional: string[] = [];

  let i = 0;
  while (i < args.length) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      flags[args[i].slice(2)] = args[i + 1];
      i += 2;
    } else {
      positional.push(args[i]);
      i++;
    }
  }

  return { flags, positional };
}

async function main() {
  switch (command) {
    case "list-entities":
      console.log(JSON.stringify(await listEntities(args[0]), null, 2));
      break;

    case "get-entity":
      if (!args[0]) {
        console.error("Usage: graph-api get-entity <id>");
        process.exit(1);
      }
      console.log(JSON.stringify(await getEntity(args[0]), null, 2));
      break;

    case "create-entity":
      if (args.length < 3) {
        console.error(
          'Usage: graph-api create-entity <name> <type> "<description>"'
        );
        process.exit(1);
      }
      console.log(
        JSON.stringify(
          await createEntity({
            name: args[0],
            type: args[1],
            description: args.slice(2).join(" "),
          }),
          null,
          2
        )
      );
      break;

    case "update-entity": {
      if (!args[0]) {
        console.error(
          "Usage: graph-api update-entity <id> [--name n] [--type t] [--description d]"
        );
        process.exit(1);
      }
      const { flags } = parseArgs(args.slice(1));
      const updates: Record<string, string> = {};
      if (flags.name) updates.name = flags.name;
      if (flags.type) updates.type = flags.type;
      if (flags.description) updates.description = flags.description;
      if (Object.keys(updates).length === 0) {
        console.error("No updates provided. Use --name, --type, or --description");
        process.exit(1);
      }
      console.log(JSON.stringify(await updateEntity(args[0], updates), null, 2));
      break;
    }

    case "delete-entity":
      if (!args[0]) {
        console.error("Usage: graph-api delete-entity <id>");
        process.exit(1);
      }
      console.log(JSON.stringify(await deleteEntity(args[0]), null, 2));
      break;

    case "create-relationship":
      if (args.length < 3) {
        console.error(
          "Usage: graph-api create-relationship <source_id> <target_id> <type> [description] [strength]"
        );
        process.exit(1);
      }
      console.log(
        JSON.stringify(
          await createRelationship({
            source_entity_id: args[0],
            target_entity_id: args[1],
            type: args[2],
            description: args[3],
            strength: args[4] ? parseFloat(args[4]) : undefined,
          }),
          null,
          2
        )
      );
      break;

    case "delete-relationship":
      if (!args[0]) {
        console.error("Usage: graph-api delete-relationship <id>");
        process.exit(1);
      }
      console.log(JSON.stringify(await deleteRelationship(args[0]), null, 2));
      break;

    case "create-entity-provenance":
      if (args.length < 3) {
        console.error(
          'Usage: graph-api create-entity-provenance <entity_id> <chunk_id> <work_id> "<snippet>"'
        );
        process.exit(1);
      }
      console.log(
        JSON.stringify(
          await createEntityProvenance({
            entity_id: args[0],
            chunk_id: args[1],
            work_id: args[2],
            snippet: args.length > 3 ? args.slice(3).join(" ") : undefined,
          }),
          null,
          2
        )
      );
      break;

    case "create-relationship-provenance":
      if (args.length < 3) {
        console.error(
          'Usage: graph-api create-relationship-provenance <relationship_id> <chunk_id> <work_id> "<snippet>"'
        );
        process.exit(1);
      }
      console.log(
        JSON.stringify(
          await createRelationshipProvenance({
            relationship_id: args[0],
            chunk_id: args[1],
            work_id: args[2],
            snippet: args.length > 3 ? args.slice(3).join(" ") : undefined,
          }),
          null,
          2
        )
      );
      break;

    case "list-changes":
      console.log(JSON.stringify(await listChanges(), null, 2));
      break;

    case "acknowledge":
      if (!args[0]) {
        console.error("Usage: graph-api acknowledge <change_id>");
        process.exit(1);
      }
      console.log(JSON.stringify(await acknowledgeChange(args[0]), null, 2));
      break;

    case "search":
      if (!args[0]) {
        console.error("Usage: graph-api search <query>");
        process.exit(1);
      }
      console.log(
        JSON.stringify(
          await searchCorpus(args.join(" "), { max_results: 10 }),
          null,
          2
        )
      );
      break;

    case "chunks":
      if (!args[0]) {
        console.error("Usage: graph-api chunks <work_id>");
        process.exit(1);
      }
      console.log(JSON.stringify(await getWorkChunks(args[0]), null, 2));
      break;

    default:
      console.error(`Knowledge Graph API Client

Usage: bun run graph-api.ts <command> [args...]

Commands:
  list-entities [type]                        List entities, optionally filter by type
  get-entity <id>                             Get entity with neighborhood
  create-entity <name> <type> <description>   Create an entity
  update-entity <id> [--name n] [--type t] [--description d]  Update an entity
  delete-entity <id>                          Delete an entity
  create-relationship <src> <tgt> <type> [desc] [str]  Create a relationship
  delete-relationship <id>                    Delete a relationship
  create-entity-provenance <eid> <cid> <wid> [snippet]  Create entity provenance
  create-relationship-provenance <rid> <cid> <wid> [snippet]  Create relationship provenance
  list-changes                                List unprocessed expertise changes
  acknowledge <id>                            Acknowledge a change as processed
  search <query>                              Search the expertise corpus
  chunks <work_id>                            Get chunks for a work

Environment:
  VIA_API_TOKEN   API bearer token (required)
  FLOW_STUDIO_URL               Base URL (default: http://localhost:4100)`);
      process.exit(command ? 1 : 0);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
