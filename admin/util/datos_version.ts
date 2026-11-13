/**
 * Fork (project-nomad-es): decide whether the drug data packages published on
 * the fork's `datos` branch are newer than the ones installed.
 *
 * Each publish writes `paquetes.json` next to the packages (see
 * tools/datos/publicar.py) with an `actualizado` timestamp that changes on
 * every publish (AEMPS weekly, ANMAT monthly) and the `generado` date of each
 * package. Pure functions only, so they can be unit-tested.
 */

export interface PaquetesJson {
  'actualizado'?: string
  'aemps-prospectos'?: { generado?: string; registros?: number }
  'anmat-vnm'?: { generado?: string; registros?: number }
}

export interface DatosVersion {
  /** When the `datos` branch was last published (ISO). */
  published: string
  /** `generado` of the AEMPS package in that publish (ISO), if known. */
  aempsGenerated: string | null
}

export function parsePaquetesJson(data: unknown): DatosVersion | null {
  if (!data || typeof data !== 'object') return null
  const p = data as PaquetesJson
  if (typeof p.actualizado !== 'string' || Number.isNaN(Date.parse(p.actualizado))) return null
  const aemps = p['aemps-prospectos']?.generado
  return {
    published: p.actualizado,
    aempsGenerated: typeof aemps === 'string' && !Number.isNaN(Date.parse(aemps)) ? aemps : null,
  }
}

/**
 * True when the remote publish is newer than what is installed.
 *
 * `installedPublished` is the `actualizado` recorded when the data was
 * installed. Installs that could not read `paquetes.json` (offline at the
 * time, or installed before it existed) fall back to comparing the AEMPS
 * package date, which is always recorded.
 */
export function isUpdateAvailable(
  remote: DatosVersion | null,
  installed: { published: string | null; aempsPackageDate: string | null }
): boolean {
  if (!remote) return false
  if (installed.published) {
    return Date.parse(remote.published) > Date.parse(installed.published)
  }
  if (installed.aempsPackageDate && remote.aempsGenerated) {
    return Date.parse(remote.aempsGenerated) > Date.parse(installed.aempsPackageDate)
  }
  return false
}
