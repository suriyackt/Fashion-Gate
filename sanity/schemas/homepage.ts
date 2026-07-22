import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: Home,
  groups: [
    { name: 'sections', title: 'Page Sections', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (internal)',
      type: 'string',
      initialValue: 'Homepage',
      hidden: true,
    }),

    // Reorderable Sections
    defineField({
      name: 'sections',
      title: 'Page Sections',
      description: 'Drag to reorder sections. Each section can be enabled/disabled individually.',
      type: 'array',
      group: 'sections',
      of: [
        { type: 'heroSection' },
        { type: 'showcaseSection' },
        { type: 'statsSection' },
        { type: 'logoMarqueeSection' },
        { type: 'founderSection' },
        { type: 'capabilitiesSection' },
        { type: 'portfolioSection' },
        { type: 'industriesSection' },
        { type: 'partnersSection' },
        { type: 'certificationsSection' },
        { type: 'faqSection' },
        { type: 'contactSection' },
        { type: 'contactInquirySection' },
      ],
    }),

    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      sections: 'sections',
    },
    prepare({ sections }) {
      const enabledCount = sections?.filter((s: { enabled?: boolean }) => s.enabled !== false).length || 0
      return {
        title: 'Homepage',
        subtitle: `${enabledCount} sections enabled`,
      }
    },
  },
})
