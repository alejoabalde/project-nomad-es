/**
 * Fork (project-nomad-es): where NOMAD in Spanish looks for its own versions.
 *
 * The Spanish Command Center image is published by this fork
 * (.github/workflows/build-primary-image-es.yml), together with a GitHub
 * release `vX.Y.Z` in the fork. The update check and the nightly auto-update
 * compare against those releases, not against the original NOMAD ones: a new
 * original version is only offered once its Spanish image is published.
 * Both can be overridden with environment variables.
 */
export const NOMAD_RELEASES_API =
  process.env.NOMAD_RELEASES_API ||
  'https://api.github.com/repos/alejoabalde/project-nomad-es/releases'

export const NOMAD_ADMIN_IMAGE_REPO =
  process.env.NOMAD_ADMIN_IMAGE_REPO || 'ghcr.io/alejoabalde/project-nomad-es'
