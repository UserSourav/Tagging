const quickCommands = [
  "devtrace start DT-21 # Set active ticket",
  'git commit -m "implement api" # Auto-formatted + auto-posted to Jira',
  "devtrace tkt DT-21 # View ticket details"
];

const cliCommands = [
  {
    command: "devtrace init",
    description:
      "Initializes DevTrace in the current repository, creates .devtrace/, and activates Git hooks."
  },
  {
    command: "devtrace init jira",
    description:
      "Configures Jira credentials interactively (host, email, API token) and stores them locally."
  },
  {
    command: "devtrace start <ticket-id>",
    description:
      "Sets the active Jira ticket for the current session so commits and comments auto-link to it."
  },
  {
    command: "devtrace tickets [list] [--status] [--limit]",
    description:
      "Lists assigned tickets with optional filtering and limits in a rich terminal table."
  },
  {
    command: "devtrace tkt <ticket-id> [--no-comments]",
    description:
      "Shows full ticket details including description, assignee, status, and recent comments."
  },
  {
    command: 'devtrace comment "<message>" [--ticket <id>] ',
    description:
      "Posts a comment to Jira, defaulting to the active ticket when --ticket is omitted."
  }
];

const hooks = [
  {
    name: "prepare-commit-msg",
    details:
      "Prepends active ticket ID and formats message, e.g. DT-21 | FEAT : implement api endpoint"
  },
  {
    name: "commit-msg",
    details:
      "Validates commit message format: [TICKET-ID] | [TYPE] : [Description]"
  },
  {
    name: "post-commit",
    details:
      "Posts structured Jira updates after successful commits; skips on [WIP] or missing active ticket"
  }
];

const commitTypes = ["FEAT", "FIX", "INIT", "DOCS", "REFACTOR", "TEST", "CHORE"];

export default function Home() {
  return (
    <main className="page">
      <header className="hero card">
        <p className="eyebrow">DevTrace CLI</p>
        <h1>Command Reference Documentation</h1>
        <p>
          <strong>Version:</strong> v0.1.0 • <strong>Status:</strong> Production Ready
          (Phase 1 &amp; 2) • <strong>Last Updated:</strong> April 09, 2026
        </p>
        <a href="https://github.com/UserSourav/devtrace-cli" target="_blank" rel="noreferrer">
          View Repository
        </a>
      </header>

      <section className="card">
        <h2>Overview</h2>
        <p>
          DevTrace bridges Jira and Git workflows by auto-formatting commits, auto-posting updates
          to Jira, and exposing ticket workflows directly from the terminal.
        </p>
        <pre>
          <code>{quickCommands.join("\n")}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Installation</h2>
        <ol>
          <li>Clone: <code>git clone https://github.com/UserSourav/devtrace-cli</code></li>
          <li>Install dependencies: <code>uv sync</code></li>
          <li>Verify: <code>uv run devtrace --help</code></li>
        </ol>
        <p>
          DevTrace config lives at <code>~/.devtrace/configs/local/local_config.toml</code>.
        </p>
      </section>

      <section className="card">
        <h2>CLI Commands</h2>
        <div className="grid">
          {cliCommands.map((item) => (
            <article key={item.command} className="miniCard">
              <h3>{item.command}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Git Hook Commands</h2>
        <ul>
          {hooks.map((hook) => (
            <li key={hook.name}>
              <strong>{hook.name}</strong>: {hook.details}
            </li>
          ))}
        </ul>
      </section>

      <section className="card split">
        <div>
          <h2>Commit Message Format</h2>
          <pre>
            <code>[TICKET-ID] | [TYPE] : [Description]</code>
          </pre>
        </div>
        <div>
          <h2>Allowed Types</h2>
          <div className="tags">
            {commitTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Workflow Example</h2>
        <pre>
          <code>{`devtrace tickets

devtrace start DT-21

git add src/
git commit -m "implement feature"

devtrace tkt DT-21
devtrace comment "Ready for code review"`}</code>
        </pre>
      </section>
    </main>
  );
}
