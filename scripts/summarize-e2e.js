const fs = require("fs");

const input = process.argv[2];
const output = process.argv[3];
const report = JSON.parse(fs.readFileSync(input, "utf8"));
const rows = [];

function visit(suites, prefix = []) {
  for (const suite of suites || []) {
    const next = suite.title ? [...prefix, suite.title] : prefix;
    for (const spec of suite.specs || []) {
      for (const item of spec.tests || []) {
        const attempts = item.results || [];
        const last = attempts[attempts.length - 1] || {};
        rows.push({
          title: [...next, spec.title].filter(Boolean).join(" > "),
          project: item.projectName || item.projectId || "chromium",
          status: last.status || item.status || "unknown",
          duration_ms: attempts.reduce((sum, result) => sum + (result.duration || 0), 0),
          error: last.error ? String(last.error.message || last.error.value || "").split("\n")[0] : null
        });
      }
    }
    visit(suite.suites, next);
  }
}

visit(report.suites);
const failed = rows.filter(row => !["passed", "skipped"].includes(row.status));
const summary = {
  tested_commit: process.env.TESTED_COMMIT || null,
  outcome: failed.length || (report.errors || []).length ? "failed" : "passed",
  total: rows.length,
  passed: rows.filter(row => row.status === "passed").length,
  skipped: rows.filter(row => row.status === "skipped").length,
  failed: failed.length,
  tests: rows,
  runner_errors: (report.errors || []).map(error => String(error.message || error.value || error).split("\n")[0])
};

fs.mkdirSync(require("path").dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
