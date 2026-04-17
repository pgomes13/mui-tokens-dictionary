const REPO = 'https://github.com/pgomes13/mui-tokens-dictionary'

export function Footer() {
  const version = __APP_VERSION__
  return (
    <footer className="footer">
      <a
        href={`${REPO}/releases/tag/v${version}`}
        target="_blank"
        rel="noreferrer"
      >
        v{version}
      </a>
    </footer>
  )
}
