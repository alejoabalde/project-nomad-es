import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Fork (project-nomad-es): Argentine brand names from the ANMAT "Vademécum
 * Nacional de Medicamentos", one row per presentation. Used to map a brand an
 * Argentine user knows (TAFIROL, IBUPIRAC…) to its active ingredients, and from
 * there to the Spanish leaflets (AEMPS) of the same ingredients. Holds no
 * leaflet text of its own.
 */
export default class extends BaseSchema {
  protected tableName = 'drug_brands_ar'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('clave', 64).notNullable().unique()
      table.string('certificado', 16).notNullable()
      table.string('nombre_comercial', 255).notNullable()
      table.string('laboratorio', 255).nullable()
      table.string('forma', 128).nullable()
      table.string('presentacion', 255).nullable()
      table.string('gtin', 20).nullable()
      table.string('generico', 512).nullable()
      /** Comma-separated active ingredients, lowercase, in AEMPS naming. */
      table.string('ingredientes', 512).nullable()
      /** Brand name folded for search (lowercase, no accents). */
      table.string('searchable', 255).notNullable().index('idx_drug_brands_ar_searchable')
      table.timestamp('ingested_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
