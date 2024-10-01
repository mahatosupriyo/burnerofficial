// 'use server'

// import { PrismaClient } from '@prisma/client'
// import { z } from 'zod'
// import { sanitize } from 'isomorphic-dompurify'
// import { logger } from '@/lib/logger'

// const prisma = new PrismaClient()

// const SearchQuerySchema = z.object({
//   query: z.string().max(100),
// })

// interface SitemapItem {
//   id: string
//   name: string
//   label: string
//   url: string
//   createdAt: Date
//   updatedAt: Date
// }

// interface SitemapResult {
//   items: SitemapItem[]
// }

// interface ErrorResult {
//   error: string
// }

// export async function searchSitemapItems(rawQuery: string): Promise<SitemapResult | ErrorResult> {
//   try {
//     const { query } = SearchQuerySchema.parse({ query: rawQuery })
//     const sanitizedQuery = sanitize(query)

//     logger.info(`Sitemap search request: ${sanitizedQuery}`)

//     if (!sanitizedQuery.trim()) {
//       return { items: [] }
//     }

//     const items = await prisma.sitemapItem.findMany({
//       where: {
//         OR: [
//           { name: { contains: sanitizedQuery, mode: 'insensitive' } },
//           { label: { contains: sanitizedQuery, mode: 'insensitive' } },
//           { url: { contains: sanitizedQuery, mode: 'insensitive' } },
//         ],
//       },
//       orderBy: {
//         name: 'asc',
//       },
//       take: 50, // Limit the number of results
//     })

//     return { items }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       logger.warn(`Invalid search query: ${error.message}`)
//       return { error: 'Invalid search query' }
//     }
//     logger.error('Error searching sitemap items:', error)
//     return { error: 'Failed to search sitemap items' }
//   }
// }



'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { sanitize } from 'isomorphic-dompurify'
import { logger } from '@/lib/logger'

const prisma = new PrismaClient()

const SearchQuerySchema = z.object({
  query: z.string().max(100),
})

interface SitemapItem {
  id: string
  name: string
  label: string
  url: string
  thumbnail: string | null  // Update to allow null
  createdAt: Date
  updatedAt: Date
}

interface SitemapResult {
  items: SitemapItem[]
}

interface ErrorResult {
  error: string
}

export async function searchSitemapItems(rawQuery: string): Promise<SitemapResult | ErrorResult> {
  try {
    const { query } = SearchQuerySchema.parse({ query: rawQuery })
    const sanitizedQuery = sanitize(query)

    logger.info(`Sitemap search request: ${sanitizedQuery}`)

    if (!sanitizedQuery.trim()) {
      return { items: [] }
    }

    const items = await prisma.sitemapItem.findMany({
      where: {
        OR: [
          { name: { contains: sanitizedQuery, mode: 'insensitive' } },
          { label: { contains: sanitizedQuery, mode: 'insensitive' } },
          { url: { contains: sanitizedQuery, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        name: 'asc',
      },
      take: 50, // Limit the number of results
    })

    return { items }
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn(`Invalid search query: ${error.message}`)
      return { error: 'Invalid search query' }
    }
    logger.error('Error searching sitemap items:', error)
    return { error: 'Failed to search sitemap items' }
  }
}