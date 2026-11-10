import { DocsService } from '#services/docs_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DocsController {
    constructor(
        private docsService: DocsService
    ) { }

    async list({ }: HttpContext) {
        return await this.docsService.getDocs();
    }

    async show({ params, inertia, request }: HttpContext) {
        // The UI language lives in the browser; i18n mirrors it into this cookie (project-nomad-es).
        const language = /(?:^|;\s*)nomad_lang=([a-z-]+)/i.exec(request.header('cookie') ?? '')?.[1] ?? 'es'
        const content = await this.docsService.parseFile(params.slug, language);
        return inertia.render('docs/show', {
            content,
        });
    }
}