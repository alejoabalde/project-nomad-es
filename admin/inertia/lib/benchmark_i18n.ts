/**
 * Localizes the live benchmark texts that come from the server in English
 * (stage labels, partial-result labels and progress messages). project-nomad-es fork.
 */
import type { TFunction } from 'i18next'

const MESSAGE_KEYS: Record<string, string> = {
  'Detecting system hardware...': 'detecting',
  'Starting benchmark...': 'starting',
  'Calculating NOMAD score...': 'calculating',
  'Benchmark completed successfully': 'completed',
  'Running CPU benchmark (single-thread)...': 'cpuSingle',
  'Running memory benchmark...': 'memory',
  'Running disk read benchmark...': 'diskRead',
  'Running disk write benchmark...': 'diskWrite',
  'Running AI benchmark...': 'ai',
  'Warming up AI model...': 'warmup',
  'Pulling sysbench image...': 'pulling',
}

export function localizeBenchmarkMessage(t: TFunction, message: string): string {
  const key = MESSAGE_KEYS[message]
  if (key) return t(`settings:benchmarkRun.msg.${key}`)
  let m = /^Running CPU benchmark \((\d+)-thread\)\.\.\.$/.exec(message)
  if (m) return t('settings:benchmarkRun.msg.cpuMulti', { n: m[1] })
  m = /^Running AI benchmark \((\d+)\/(\d+)\)\.\.\.$/.exec(message)
  if (m) return t('settings:benchmarkRun.msg.aiRun', { i: m[1], n: m[2] })
  m = /^Benchmark failed: (.*)$/s.exec(message)
  if (m) return t('settings:benchmarkRun.msg.failed', { error: m[1] })
  return message
}
