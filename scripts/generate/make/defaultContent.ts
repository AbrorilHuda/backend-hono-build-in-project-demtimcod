export default function defaultContent(type: String) {
  return `// di generate oleh dc assistents
export default function ${type}() {
    return "${type}"
}`;
}
