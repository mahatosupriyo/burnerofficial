// // app/actions/sitemap/sitemapsearch.ts

// 'use server'

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

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

// export async function searchSitemapItems(query: string): Promise<SitemapResult | ErrorResult> {
//   try {
//     const items = await prisma.sitemapItem.findMany({
//       where: {
//         OR: [
//           { name: { contains: query, mode: 'insensitive' } },
//           { label: { contains: query, mode: 'insensitive' } },
//           { url: { contains: query, mode: 'insensitive' } },
//         ],
//       },
//       orderBy: {
//         name: 'asc',
//       },
//     })

//     return { items }
//   } catch (error) {
//     console.error('Error searching sitemap items:', error)
//     return { error: 'Failed to search sitemap items' }
//   }
// }


// app/actions/sitemap/sitemapsearch.ts

'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { sanitize } from 'isomorphic-dompurify'
import { logger } from '@/lib/logger'

const prisma = new PrismaClient()

const SearchQuerySchema = z.object({
  query: z.string().min(1).max(100),
})

interface SitemapItem {
  id: string
  name: string
  label: string
  url: string
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