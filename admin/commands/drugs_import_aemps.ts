import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

/**
 * Fork (project-nomad-es): import the Spanish leaflet package (CIMA/AEMPS)
 * into the Drug Reference. Prototype entry point; a download flow like the
 * FDA one comes later.
 */
export default class DrugsImportAemps extends BaseCommand {
  static commandName = 'drugs:import-aemps'
  static description = 'Import the AEMPS (CIMA) Spanish leaflet package into the Drug Reference'

  @args.string({ description: 'Path to the .jsonl or .jsonl.gz package' })
  declare file: string

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const { AempsDrugImportService } = await import('#services/aemps_drug_import_service')
    const result = await new AempsDrugImportService().importFile(this.file)
    this.logger.success(`Imported ${result.imported} leaflets (${result.skipped} skipped)`)
  }
}
