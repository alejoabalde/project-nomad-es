/**
 * Localizes the curated "when to use what" situations and their categories,
 * which come from the server in English (app/data/conditions.ts).
 * Keyed by slug / English category so the curated data stays untouched.
 * project-nomad-es fork.
 */
import type { TFunction } from 'i18next'

const CATEGORY_KEYS: Record<string, string> = {
  'Pain, fever & inflammation': 'pain',
  'Cold, cough & allergy': 'cold',
  'Stomach & digestion': 'stomach',
  'Skin & wounds': 'skin',
  'Eyes, ears & mouth': 'eyes',
  'Sleep, stress & general': 'general',
  'Infections (OTC-treatable)': 'infections',
}

export function situationLabel(t: TFunction, c: { slug: string; label: string }): string {
  return t(`drugs:situations.${c.slug}`, { defaultValue: c.label })
}

export function categoryLabel(t: TFunction, category: string): string {
  const key = CATEGORY_KEYS[category]
  return key ? t(`drugs:categories.${key}`, { defaultValue: category }) : category
}
