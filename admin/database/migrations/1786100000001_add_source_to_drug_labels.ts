import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Fork (project-nomad-es): drug_labels can hold labels from more than one
 * source. `fda` rows come from openFDA (English); `aemps` rows are Spanish
 * patient leaflets (prospectos) from CIMA/AEMPS, imported from a prebuilt
 * package. AEMPS rows keep their leaflet sections, with the original
 * headings, in `sections`; the flat columns (indications, dosage, ...) are
 * still filled so search and comparison keep working.
 */
export default class extends BaseSchema {
  protected tableName = 'drug_labels'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('source', 8).notNullable().defaultTo('fda').index('idx_drug_labels_source')
      table.json('sections').nullable()
      table.string('source_url', 512).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['source'], 'idx_drug_labels_source')
      table.dropColumn('source')
      table.dropColumn('sections')
      table.dropColumn('source_url')
    })
  }
}
