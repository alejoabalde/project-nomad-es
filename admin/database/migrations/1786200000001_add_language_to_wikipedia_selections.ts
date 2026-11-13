import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * One Wikipedia selection per language (fork-only), so a Spanish and an English
 * Wikipedia can be installed at the same time. Existing rows keep working: a
 * row pointing at a Spanish file or option becomes the Spanish selection, any
 * other row stays the English one.
 */
export default class extends BaseSchema {
  protected tableName = 'wikipedia_selections'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('language', 5).notNullable().defaultTo('en')
    })

    this.defer(async (db) => {
      await db
        .from(this.tableName)
        .where((q) =>
          q.where('filename', 'like', 'wikipedia_es_%').orWhere('option_id', 'like', 'es-%')
        )
        .update({ language: 'es' })
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('language')
    })
  }
}
