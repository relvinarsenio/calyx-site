/**
 * @file runScript.ts
 * @description Provides the dynamic launcher bash script for Calyx.
 */

/**
 * Formats text lines into a standard boxed bash echo banner.
 * Used to ensure consistent console formatting and visual presentation across shell runs.
 *
 * @param lines Text lines to display in the banner.
 * @returns The generated bash echo commands.
 */
function buildBashBanner(lines: string[]): string {
	const border = '-'.repeat(64);
	const bannerLines = [border, ...lines, border];
	return bannerLines.map((line) => `echo "${line}"`).join('\n');
}

const header = `#!/usr/bin/env bash
set -e

# --- INFO MESSAGE ---
${buildBashBanner([
	'Calyx - Server Benchmark Utility',
	'Downloading native C++23 binary...',
	'Initializing execution...'
])}`;

const checkArch = `# Validate target CPU architecture to download the correct build variant
ARCH=$(uname -m)

if [[ "$ARCH" == "x86_64" || "$ARCH" == "amd64" ]]; then
    TARGET_BINARY="calyx-amd64"
elif [[ "$ARCH" == "aarch64" || "$ARCH" == "arm64" ]]; then
    TARGET_BINARY="calyx-arm64"
else
    echo "Error: Calyx currently supports x86_64 and arm64 architectures only. Detected: $ARCH"
    exit 1
fi`;

const checkDependencies = `# Require curl to download release assets from GitHub
if ! command -v curl >/dev/null 2>&1; then
    echo "Error: 'curl' is required to install and run Calyx."
    exit 1
fi`;

const createTempDir = `# Store the binary in an isolated temporary workspace
TMP_DIR=$(mktemp -d)
BINARY="$TMP_DIR/calyx"

# Ensure the temporary workspace is cleaned up automatically upon exit or interruption
trap 'rm -rf "$TMP_DIR"' EXIT`;

const downloadBinary = `# Fetch release assets from GitHub and follow CDN redirect locations
URL="https://github.com/relvinarsenio/calyx/releases/latest/download/$TARGET_BINARY"
curl -fsL -o "$BINARY" "$URL"

# Verify the downloaded file exists and is valid before running to prevent crash
if [[ ! -s "$BINARY" ]]; then
    echo "Error: Download failed or file is empty."
    exit 1
fi`;

const executeBinary = `# Run the downloaded C++ binary propagating all script arguments
chmod +x "$BINARY"
"$BINARY" "$@"`;

/**
 * Compiles the modular bash script sections into a single executable shell script.
 * Serves as the primary entry point for terminal installation and runs.
 *
 * @returns The fully assembled bash script.
 */
export function getRunScript(): string {
	return [header, checkArch, checkDependencies, createTempDir, downloadBinary, executeBinary].join(
		'\n\n'
	);
}
